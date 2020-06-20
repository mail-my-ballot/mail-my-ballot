import { RawContactRecord, ContactRecord, RawContact, OptionalLocale } from "./type"
import { AvailableState } from "../../common"
import { mandatoryTransform } from "./transformers"
import { e164 } from '../twilio'

const lowerCase = <T>(f: (_: T) => string): (_: T) => string => {
  return (arg: T) => {
    return f(arg).toLowerCase()
  }
}

/**
 * Every key is of the form `city + ':' + county`
 * */
const normalizeKey = lowerCase(({ state, county, city }: OptionalLocale): string => {
  switch(state) {
    // Only county
    case 'Arizona':
    case 'Florida':
    case 'Georgia':
    case 'Minnesota':
    case 'Nebraska':
    case 'New York':
    case 'North Carolina':
    case 'Oklahoma':
    case 'Wyoming': {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return ':' + county!
    }

    // Only city
    case 'Maine':
    case 'New Hampshire': {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return city! + ':'
    }

    // hybrid count or city
    case 'Maryland': // Baltimore city is independent of county
    case 'Virginia': // Alexandria, Fairfax are independent of county.  All end in "City"
    case 'Nevada': {  // Carson City is independent of county
      return (city ?? '') + ':' + (county ?? '')
    }

    // both city and county
    case 'Michigan': {
      return city + ':' + county
    }
    case 'Wisconsin': {
      return city + ':' + (county ?? '')
    }
  }
})
/* eslint-enable @typescript-eslint/no-non-null-assertion */

export const normalizeLocaleKey = ({state, city, county}: OptionalLocale): string => {
  return normalizeKey({
    state,
    city: city ? mandatoryTransform(city.toLowerCase()) : undefined,
    county: county ? mandatoryTransform(county.toLowerCase()) : undefined,
  })
}

const normalizeContact = (contact: RawContact): RawContact => {
  return {
    ...contact,
    faxes: contact.faxes?.map(e164)
  }
}

export const normalizeState = (
  state: AvailableState,
  contacts: RawContact[]
): Record<string, RawContact> => {
  const array = contacts.map(
    contact => [
      normalizeLocaleKey({
        state,
        city: contact.city,
        county: contact.county,
      }),
      normalizeContact(contact),
    ]
  )
  return Object.fromEntries(array)
}

export const normalizeStates = (records: RawContactRecord): ContactRecord => {
  const rawArray  = Object.entries(records) as Array<[AvailableState, RawContact[]]>
  const array = rawArray.map(
    ([state, contactDatas]) => [
      state,
      normalizeState(state, contactDatas)
    ]
  )
  return Object.fromEntries(array)
}
