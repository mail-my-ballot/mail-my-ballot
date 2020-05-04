import { RawContactRecord, ContactRecord, RawContact } from "./type"
import { AvailableState } from "../../common"
import { mandatoryTransform } from "./transformers"

interface OptionalLocale {
  state: AvailableState
  county?: string
  city?: string
}

const lowerCase = <T>(f: (_: T) => string): (_: T) => string => {
  return (arg: T) => {
    return f(arg).toLowerCase()
  }
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const normalizeKey = lowerCase(({ state, county, city }: OptionalLocale): string => {
  switch(state) {
    case 'Florida':
    case 'Georgia':
    case 'Maryland':
    case 'Minnesota':
    case 'Nebraska': {
      return county!
    }
    case 'Maine': {
      return city!
    }
    case 'Michigan': {
      return city + ':' + county
    }
    case 'Nevada': {
      return (city ?? '') + ':' + (county ?? '')
    }
    case 'Virginia': {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return city ?? county!
    }
    case 'Wisconsin': {
      return city + ':' + (county ?? '')
    }
  }
})
/* eslint-enable @typescript-eslint/no-non-null-assertion */

export const normalizeState = (state: AvailableState, contacts: RawContact[]): Record<string, RawContact> => {
  const array = contacts.map(
    contact => {
      const locale = {
        state,
        city: contact.city ? mandatoryTransform(contact.city) : undefined,
        county: contact.county ? mandatoryTransform(contact.county) : undefined,
      }
      return [
        normalizeKey(locale),
        contact,
      ]
    }
  )
  return Object.fromEntries(array)
}

export const normalize = (records: RawContactRecord): ContactRecord => {
  const rawArray  = Object.entries(records) as Array<[AvailableState, RawContact[]]>
  const array = rawArray.map(
    ([state, contactDatas]) => [
      state,
      normalizeState(state, contactDatas)
    ]
  )
  return Object.fromEntries(array)
}
