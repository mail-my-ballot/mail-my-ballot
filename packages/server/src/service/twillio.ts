import Twillio from 'twilio'
import { processEnvOrThrow } from '../common'

const client = Twillio(
  processEnvOrThrow('TWILLIO_SID'),
  processEnvOrThrow('TWILLIO_TOKEN'),
)
const from = processEnvOrThrow('TWILLIO_FAX_NUMBER')

export const sendFax = async (url: string, tos: string[]) => {
  return Promise.all(
    tos.map(to => client.fax.faxes
      .create({
        from,
        to,
        mediaUrl: url
      })
    )
  )
}
