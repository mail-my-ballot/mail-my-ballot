import mailgun from 'mailgun-js'
import { processEnvOrThrow } from '../common'
import marked = require('marked')

const mgData = () => ({
  domain: processEnvOrThrow('MG_DOMAIN'),
  apiKey: processEnvOrThrow('MG_API_KEY'),
  from: processEnvOrThrow('MG_FROM_ADDR'),
})

export interface EmailData {
  to: string | string[]
  subject: string
  md: string
}

export const sendMdEmail = (
  {to, subject, md}: EmailData
): Promise<mailgun.messages.SendResponse> => {
  const {domain, apiKey, from} = mgData()
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
