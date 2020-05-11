import Twillio from 'twilio'
import { processEnvOrThrow } from '../common'

const client = Twillio(
  processEnvOrThrow('TWILLIO_SID'),
  processEnvOrThrow('TWILLIO_TOKEN'),
)
const from = processEnvOrThrow('TWILLIO_FAX_NUMBER')
const receiveFax = processEnvOrThrow('RECEIVE_FAX_NUMBER')

/** phone numbers must be E164 for Twillio: https://www.twilio.com/docs/glossary/what-e164 */
const regex = /^\D*1?\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/
export const e164 = (number: string): string => {
  const parts = number.match(regex)
  if (!parts) throw Error(`Regex failed to match fax ${number}`)
  return '+1' + parts.splice(1,).join('')
}

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
