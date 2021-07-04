import mailgun from 'mailgun-js'

import { Letter } from './letter'
import { processEnvOrThrow } from '../common'

export const mg = mailgun({
  domain: processEnvOrThrow('MG_DOMAIN'),
  apiKey: processEnvOrThrow('MG_API_KEY'),
})

interface Options {
  pdfBuffer?: Buffer
  force?: boolean
}

// separate out this function for testing purposes
export const toSignupEmailData = (
  letter: Letter,
  voterEmail: string,
  officialEmails: string[],
  { pdfBuffer, force }: Options = { force: false }
): mailgun.messages.SendData => {
  const emailOfficials = !!process.env.EMAIL_FAX_OFFICIALS
  const to = (emailOfficials || force) ? [voterEmail, ...officialEmails] : [voterEmail]
  const { md, render, signatureAttachment, idPhotoAttachment, subject } = letter
  const mgData = {
    from: processEnvOrThrow('MG_FROM_ADDR'),
    'h:Reply-To': [processEnvOrThrow('MG_REPLY_TO_ADDR'), voterEmail, ...officialEmails].join(','),
  }

  const attachment = [
    signatureAttachment ?? [],
    idPhotoAttachment ?? [],
    pdfBuffer ? [new mg.Attachment({data: pdfBuffer, filename: 'letter.pdf'})] : []
  ].flatMap(x => x)
  return {
    to,
    subject,
    html: render('email'),
    text: md('email'),
    attachment,
    inline: attachment,
    ...mgData,
  }
}

export const sendSignupEmail = async (
  letter: Letter,
  voterEmail: string,
  officialEmails: string[],
  { pdfBuffer, force }: Options = { force: false },
): Promise<mailgun.messages.SendResponse | null> => {
  if (process.env.MG_DISABLE) { // to disable MG for testing
    console.warn('No email sent (disabled)')
    return null
  }

  const emailData = toSignupEmailData(letter, voterEmail, officialEmails, { pdfBuffer, force })
  return mg.messages().send(emailData)
}
