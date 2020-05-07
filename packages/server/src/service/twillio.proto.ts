import { StorageFile } from './storage'
import { sendFax } from './twillio'
import { processEnvOrThrow } from '../../../client/src/common'

const main = async () => {
  const file = new StorageFile('letter/xxx.pdf')
  const [uri] = await file.getSignedUrl(24 * 60 * 60 * 1000)
  const faxInstance = await sendFax(uri, processEnvOrThrow('RECEIVE_FAX_NUMBER'))
  console.log(faxInstance)
  return faxInstance
}

main()
