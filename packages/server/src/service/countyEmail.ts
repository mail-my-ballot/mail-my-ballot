import { letter } from './letter/letter'
import { sendEmail } from './mg'
import { RegistrationInfo } from '../common'
import { floridaCounties } from '../common/data/florida'

const emailTo = (info: RegistrationInfo): string | string[] => {
  if (process.env.NODE_ENV !== 'production') {
    return info.email
  }

  switch (info.state) {
    case 'Florida': {
      return [
        info.email,
        floridaCounties[info.county].email,
      ]
    }
    default: return []
  }
}

export const sendCountyEmail = (info: RegistrationInfo) => {
  const md = letter(info)
  return sendEmail(
    emailTo(info),
    'Voter Registration Email',
    md
  )
}
