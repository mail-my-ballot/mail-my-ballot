import { RawContactRecord, ContactRecord, RawContact } from "./type"
import { AvailableState } from "../../common"

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const normaizeKey = (state: AvailableState, contact: { county?: string, city?: string }): string => {
  switch(state) {
    case 'Florida': {
      return contact.county!
    }
    case 'Georgia': {
      return contact.county!
    }
    case 'Maine': {
      return contact.city!
    }
    case 'Maryland': {
      return contact.county!
    }
    case 'Michigan': {
      return contact.city + ':' + contact.county
    }
    case 'Minnesota': {
      return contact.county!
    }
    case 'Nebraska': {
      return contact.county!
    }
    case 'Virginia': {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return contact.city ?? contact.county!
    }
    case 'Wisconsin': {
      return contact.city + ':' + (contact.county ?? '')
    }
  }
}

export const normalizeState = (state: AvailableState, contacts: RawContact[]): Record<string, RawContact> => {
  const array = contacts.map(
    contact => {
      return [
        normaizeKey(state, contact),
        contact,
      ]
    }
  )
  return Object.fromEntries(array)
}
/* eslint-enable @typescript-eslint/no-non-null-assertion */

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
