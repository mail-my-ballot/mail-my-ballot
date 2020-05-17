import mailgun from 'mailgun-js'

import { Letter } from './letter'
import { processEnvOrThrow } from '../common'


const mg = mailgun({
  domain: processEnvOrThrow('MG_DOMAIN'),
  apiKey: processEnvOrThrow('MG_API_KEY'),
})

const makePngAttachment = (
  signature: string | undefined,
  to: string
): mailgun.Attachment | undefined => {
  if (!signature) return undefined
  const data = signature.split(',')[1]
  if (!data) {
    console.error(`Unable to image signature image to ${to}.  Omitting attachment.`)
    return undefined
  }
  return new mg.Attachment({
    data: Buffer.from(data, 'base64'),
    filename: 'signature.png'
  })
}

// separate out this function for testing purposes
export const toEmailData = (
  letter: Letter,
  voterEmail: string,
  officialEmails: string[],
  force = false,
): mailgun.messages.SendData => {
  const emailOfficials = !!process.env.REACT_APP_EMAIL_FAX_OFFICIALS
  const to = (emailOfficials || force) ? [voterEmail, ...officialEmails] : [voterEmail]
  const subject = 'Vote By Mail Request'
  const { md, html, signature } = letter
  const mgData = {
    from: processEnvOrThrow('MG_FROM_ADDR'),
    replyTo: processEnvOrThrow('MG_REPLY_TO_ADDR'),
  }

  const attachment = makePngAttachment(signature, voterEmail)
  return {
    to,
    subject,
    html,
    text: md,
    attachment,
    ...mgData,
  }
}

export const sendEmail = async (
  letter: Letter,
  voterEmail: string,
  officialEmails: string[],
  force = false,
): Promise<mailgun.messages.SendResponse | null> => {
  if (process.env.MG_DISABLE) { // to disable MG for testing
    console.warn('No email sent (disabled)')
    return null
  }

  const emailData = toEmailData(letter, voterEmail, officialEmails, force)
  return mg.messages().send(emailData)
}
