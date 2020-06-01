import mailgun from 'mailgun-js'

import { Letter } from './letter'
import { processEnvOrThrow } from '../common'


const mg = mailgun({
  domain: processEnvOrThrow('MG_DOMAIN'),
  apiKey: processEnvOrThrow('MG_API_KEY'),
})

const makeImageAttachment = (
  image: string,
  filename: string,  // without file extension
  to: string,        // just for error reporting
): mailgun.Attachment[] => {
  const match = image.match(/data:image\/(.+);base64,(.+)/)
  if (!match) {
    console.error(`Unable to read image ${filename} image to ${to}.  Omitting attachment.`)
    return []
  }
  const ext = match[1]
  const data = match[2]
  return [new mg.Attachment({
    data: Buffer.from(data, 'base64'),
    filename: filename + '.' + ext,
  })]
}

interface Options {
  pdfBuffer?: Buffer
  force?: boolean
}

// separate out this function for testing purposes
export const toEmailData = (
  letter: Letter,
  voterEmail: string,
  officialEmails: string[],
  { pdfBuffer, force }: Options = { force: false }
): mailgun.messages.SendData => {
  const emailOfficials = !!process.env.REACT_APP_EMAIL_FAX_OFFICIALS
  const to = (emailOfficials || force) ? [voterEmail, ...officialEmails] : [voterEmail]
  const subject = 'Vote By Mail Request'
  const { md, html, signature, idPhoto } = letter
  const mgData = {
    from: processEnvOrThrow('MG_FROM_ADDR'),
    replyTo: processEnvOrThrow('MG_REPLY_TO_ADDR'),
  }

  const attachment = [
    signature ? makeImageAttachment(signature, 'signature', voterEmail) : [],
    idPhoto ? makeImageAttachment(idPhoto, 'identification', voterEmail) : [],
    pdfBuffer ? [new mg.Attachment({data: pdfBuffer, filename: 'letter.pdf'})] : []
  ].flatMap(x => x)
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
  { pdfBuffer, force }: Options = { force: false },
): Promise<mailgun.messages.SendResponse | null> => {
  if (process.env.MG_DISABLE) { // to disable MG for testing
    console.warn('No email sent (disabled)')
    return null
  }

  const emailData = toEmailData(letter, voterEmail, officialEmails, { pdfBuffer, force })
  return mg.messages().send(emailData)
}
