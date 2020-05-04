import { RawContactRecord, ContactRecord, RawContact, OptionalLocale } from "./type"
import { AvailableState } from "../../common"
import { mandatoryTransform } from "./transformers"

const lowerCase = <T>(f: (_: T) => string): (_: T) => string => {
  return (arg: T) => {
    return f(arg).toLowerCase()
  }
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const normalizeKey = lowerCase(({ state, county, city }: OptionalLocale): string => {
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

export const normalizeLocale = ({state, city, county}: OptionalLocale): string => {
  return normalizeKey({
    state,
    city: city ? mandatoryTransform(city) : undefined,
    county: county ? mandatoryTransform(county) : undefined,
  })
}

export const normalizeState = (state: AvailableState, contacts: RawContact[]): Record<string, RawContact> => {
  const array = contacts.map(
    contact => [
      normalizeLocale({
        state,
        city: contact.city,
        county: contact.county,
      }),
      contact,
    ]
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

