import { StateInfo, isProd } from "../../common";
import { EmailData } from "../mg";
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
  if (isProd() || mockProduction) {
    return emailData
  } else {
    if (!emailData) return emailData
    return {
      ...emailData,
      to: [info.email],
    }
  }
}
