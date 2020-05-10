import { EmailData } from "../mg"
import { Letter } from "../letter"

export const toEmailData = (
  letter: Letter,
  email: string,
  officialEmails: string[]
): EmailData => {
  return {
    voterEmail: email,
    officialEmails,
    subject: 'Vote By Mail Request',
    md: letter.md,
    html: letter.html,
    signature: letter.signature,
  }
}
