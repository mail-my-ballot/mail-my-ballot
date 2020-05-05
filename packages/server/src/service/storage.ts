import stream from 'stream'

import { Storage } from '@google-cloud/storage'
import { processEnvOrThrow } from '../../../client/src/common'

const storage = new Storage()
const bucket = processEnvOrThrow('GOOGLE_STORAGE_BUCKET')

const makeFile = (filename: string) => {
  return storage.bucket(bucket).file(filename)
}

export const upload = async (filename: string, data: string | Buffer) => {
  const bufferStream = new stream.PassThrough()
  const buffer = (data instanceof Buffer) ? data : Buffer.from(data)
  bufferStream.end(buffer)

  const file = makeFile(filename)

  const writable = bufferStream.pipe(file.createWriteStream({
    metadata: {
      contentType: 'application/pdf',
      metadata: {
        custom: 'metadata'
      }
    },
    public: false,
    validation: 'md5'
  }))

  return new Promise((resolve, reject) => {
    writable.on('finish', () => resolve(true))
    writable.on('error', reject)
  })  
}

export const getSignedUrl = async (filename: string, durationMs: number) => {
  return makeFile(filename).getSignedUrl({
    action: 'read',
    expires: new Date(new Date().getTime() + durationMs)
  })
}
