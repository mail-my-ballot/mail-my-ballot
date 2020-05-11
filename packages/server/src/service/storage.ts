import stream from 'stream'

import { Storage, File } from '@google-cloud/storage'
import { processEnvOrThrow } from '../common'

const storage = new Storage()
const bucket = processEnvOrThrow('GOOGLE_STORAGE_BUCKET')

export class StorageFile {
  filename: string
  file: File

  constructor(filename: string) {
    this.filename = filename
    this.file = storage.bucket(bucket).file(filename)
  }

  async upload(data: string | Buffer) {
    const bufferStream = new stream.PassThrough()
    const buffer = (data instanceof Buffer) ? data : Buffer.from(data)
    bufferStream.end(buffer)

  
    const writable = bufferStream.pipe(this.file.createWriteStream({
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

  getSignedUrl(durationMs: number) {
    return this.file.getSignedUrl({
      action: 'read',
      expires: new Date(new Date().getTime() + durationMs)
    })
  }
}
