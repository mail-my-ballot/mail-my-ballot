import { StateInfo, emailOfficials } from "../../common"
import { EmailData } from "../mg"
import * as Florida from './florida'
import * as Michigan from './michigan'

const _toEmailData = (info: StateInfo): EmailData | null => {
  switch(info.state) {
    case 'Florida': return Florida.toEmailData(info)
    case 'Michigan': return Michigan.toEmailData(info)
    default: return null
  }
}

interface Options {
  mockProduction: boolean
}

const defaultOptions = {
  mockProduction: false
}

export const toEmailData = (
  info: StateInfo,
  { mockProduction }: Options = defaultOptions
): EmailData | null => {
  const emailData = _toEmailData(info)
  if (!emailData) return null
  if (emailOfficials() || mockProduction) {
    return emailData
  } else {
    return {
      ...emailData,
      to: [info.email],
    }
  }
}
