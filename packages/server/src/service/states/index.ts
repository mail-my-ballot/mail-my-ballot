import { RegistrationInfo } from "../../common";
import { MdEmailData } from "../mg";
import { Florida } from './florida'

const _toEmail = (info: RegistrationInfo): MdEmailData | null => {
  switch(info.state) {
    case Florida.name: {
      return Florida.toEmail(info)
    }
    default: {
      return null
    }
  }
}

export const toEmail = (info: RegistrationInfo): MdEmailData | null => {
  const emailData = _toEmail(info)
  if (process.env.NODE_ENV === 'production') {
    return emailData
  } else {
    if (!emailData) return emailData
    return {
      ...emailData,
      to: info.email,
    }
  }
}
