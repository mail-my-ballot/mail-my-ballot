import mailgun from 'mailgun-js'
import { processEnvOrThrow } from '../common'
import marked = require('marked')

const mgData = () => ({
  domain: processEnvOrThrow('MG_DOMAIN'),
  apiKey: processEnvOrThrow('MG_API_KEY'),
  from: processEnvOrThrow('MG_FROM_ADDR'),
  replyTo: processEnvOrThrow('MG_REPLY_TO_ADDR'),
})

export interface EmailData {
  to: string[]
  subject: string
  md: string
  signature?: string  // base64-encoded signature
}

const makePngAttachment = (
  signature: string | undefined,
  to: string[],
  mg: mailgun.Mailgun
): mailgun.Attachment | undefined => {
  if (!signature) return undefined
  const data = signature.split(',')[1]
  if (!data) {
    console.error(`Bad formatting of signature image to ${to}.  Omitting attachment.`)
    return undefined
  }
  return new mg.Attachment({
    data: Buffer.from(data, 'base64'),
    filename: 'signature.png'
  })
}

export const sendEmail = (
  {to, subject, md, signature}: EmailData
): Promise<mailgun.messages.SendResponse | null> => {
  const {domain, apiKey, from, replyTo} = mgData()
  if (process.env.MG_DISABLE) {
    console.log('No email sent (disabled)')
    return new Promise(() => null)
  }
  const mg = mailgun({domain, apiKey})
  const html = marked(md)
  const attachment = makePngAttachment(signature, to, mg)

  return mg.messages().send({
    from,
    to,
    subject,
    html,
    text: md,
    attachment,
    'h:Reply-To': replyTo,
  })
}
