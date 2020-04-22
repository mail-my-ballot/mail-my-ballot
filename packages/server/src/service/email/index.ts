import { StateInfo, emailOfficials } from "../../common"
import { EmailData } from "../mg"
import * as Florida from './florida'
import * as Michigan from './michigan'
import { postscript } from "./util"

const _toEmailData = (info: StateInfo): EmailData | null => {
  switch(info.state) {
    case 'Florida': return Florida.toEmailData(info)
    case 'Michigan': return Michigan.toEmailData(info)
    default: return null
  }
}

interface Options {
  forceEmailOfficials: boolean
}

const defaultOptions = {
  forceEmailOfficials: false
}

export const toEmailData = (
  info: StateInfo,
  confirmationId: string,
  { forceEmailOfficials }: Options = defaultOptions
): EmailData | null => {
  const emailData = _toEmailData(info)
  if (!emailData) return null
  emailData.md += postscript(confirmationId)
  if (emailOfficials() || forceEmailOfficials) {
    return emailData
  } else {
    return {
      ...emailData,
      to: [info.email],
    }
  }
}
