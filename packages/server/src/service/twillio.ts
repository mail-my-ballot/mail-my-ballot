import Twillio from 'twilio'
import { processEnvOrThrow } from '../common'

const client = Twillio(
  processEnvOrThrow('TWILLIO_SID'),
  processEnvOrThrow('TWILLIO_TOKEN'),
)
const from = processEnvOrThrow('TWILLIO_FAX_NUMBER')
const receiveFax = processEnvOrThrow('RECEIVE_FAX_NUMBER')

const tos = (faxes: string[], force: boolean): string[] => {
  if (process.env.TWILLIO_DIVERT) return [receiveFax]
  if (!!process.env.REACT_APP_EMAIL_FAX_OFFICIALS || force) return faxes
  return []
}

export const sendFaxes = async (url: string, faxes: string[], force = false) => {
  if (process.env.TWILLIO_DISABLE) { // to disable Twillio for testing
    console.log('No fax sent (disabled)')
    return []
  }

  return Promise.all(
    tos(faxes, force).map(to => client.fax.faxes
      .create({
        from,
        to,
        mediaUrl: url
      })
    )
  )
}
