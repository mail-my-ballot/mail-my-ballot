import { StateInfo, emailOfficials } from "../../common"
import { EmailData } from "../mg"
import { toLetter } from "../letter"

interface Options {
  forceEmailOfficials: boolean
}

const defaultOptions = {
  forceEmailOfficials: false
}

export const toEmailData = (
  info: StateInfo,
  confirmationId: string,
  officialEmails: string[],
  { forceEmailOfficials }: Options = defaultOptions
): EmailData | null => {
  const letter = toLetter(info, confirmationId)
  if (!letter) return null

  const emailData = {
    to: [info.email],
    subject: 'Vote By Mail Request',
    md: letter.md,
    html: letter.html,
    signature: info.signature,
  }

  if (emailOfficials() || forceEmailOfficials) {
    emailData.to = [...emailData.to, ...officialEmails]
  }
  return emailData
}
