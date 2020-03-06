import * as florida from './florida'
import { RegistrationInfo } from '../../common'
import marked from 'marked'

const _letter = (info: RegistrationInfo | null) => {
  if (!info) return '**Invalid Registration Information**'

  switch (info.state) {
    case 'Florida': {
      return florida.md(info)
    }
    default: {
      return '**Invalid State**'
    }
  }
}

export const letter = (info: RegistrationInfo | null) => marked(_letter(info))
