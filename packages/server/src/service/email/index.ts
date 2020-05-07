import { EmailData } from "../mg"
import { Letter } from "../letter"

interface Options {
  forceEmailOfficials: boolean
}

const defaultOptions = {
  forceEmailOfficials: false,
}

export const toEmailData = (
  letter: Letter,
  email: string,
  officialEmails: string[],
  { forceEmailOfficials }: Options = defaultOptions
): EmailData => {
  const emailData = {
    to: [email],
    subject: 'Vote By Mail Request',
    md: letter.md,
    html: letter.html,
    signature: letter.signature,
  }

  const emailOfficials = !!process.env.REACT_APP_EMAIL_FAX_OFFICIALS

  if (emailOfficials || forceEmailOfficials) {
    emailData.to = [...emailData.to, ...officialEmails]
  }
  return emailData
}
