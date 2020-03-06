import { RegistrationInfo } from "../../common";
import { EmailData } from "../mg";
import { Florida } from './florida'

const _toEmailData = (info: RegistrationInfo): EmailData | null => {
  switch(info.state) {
    case Florida.name: {
      return Florida.toEmailData(info)
    }
    default: {
      return null
    }
  }
}

interface Options {
  mockProduction: boolean
}

const defaultOptions = {
  mockProduction: false
}

export const toEmailData = (
  info: RegistrationInfo,
  { mockProduction }: Options = defaultOptions
): EmailData | null => {
  const emailData = _toEmailData(info)
  if (process.env.NODE_ENV === 'production' || mockProduction) {
    return emailData
  } else {
    if (!emailData) return emailData
    return {
      ...emailData,
      to: [info.email],
    }
  }
}
