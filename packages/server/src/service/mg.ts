import mailgun from 'mailgun-js'
import { processEnvOrThrow } from '../common'
import marked = require('marked')

const mgData = () => ({
  domain: processEnvOrThrow('MG_DOMAIN'),
  apiKey: processEnvOrThrow('MG_API_KEY'),
  from: processEnvOrThrow('MG_FROM_ADDR'),
})

export interface EmailData {
  to: string[]
  subject: string
  md: string
}

export const sendEmail = (
  {to, subject, md}: EmailData
): Promise<mailgun.messages.SendResponse | null> => {
  const {domain, apiKey, from} = mgData()
  if (process.env.MG_DISABLE) {
    console.log('No email sent (disabled')
    return new Promise(() => null)
  }
  const mg = mailgun({domain, apiKey})
  const html = marked(md)

  return mg.messages().send({
    from,
    to,
    subject,
    html,
    text: md,
  })
}
