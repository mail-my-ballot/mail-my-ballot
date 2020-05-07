import Twillio from 'twilio'
import { processEnvOrThrow } from '../common'

const client = Twillio(
  processEnvOrThrow('TWILLIO_SID'),
  processEnvOrThrow('TWILLIO_TOKEN'),
)
const from = processEnvOrThrow('TWILLIO_FAX_NUMBER')

export const sendFax = (url: string, to: string) => {
  return client.fax.faxes
    .create({
      from,
      to,
      mediaUrl: url
    })
}
