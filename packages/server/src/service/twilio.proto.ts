import { StorageFile } from './storage'
import { sendFaxes } from './twilio'
import { processEnvOrThrow } from '../common'

const main = async () => {
  const file = new StorageFile('test/test.pdf')
  const [uri] = await file.getSignedUrl(24 * 60 * 60 * 1000)
  console.log(uri)
  const faxInstance = await sendFaxes(uri, [processEnvOrThrow('RECEIVE_FAX_NUMBER')])
  console.log(faxInstance)
  return faxInstance
}

main()
