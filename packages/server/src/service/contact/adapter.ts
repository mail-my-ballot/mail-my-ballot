import { AvailableState, ContactData, RawContactRecord, ContactRecord } from "./type"
import { Contact, Locale } from "../../common"

const maybeFirstItem = (x: string[] | undefined): string | undefined => {
  return (x) ? x[0] : undefined
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const contactAdapter = (state: AvailableState, contactData: ContactData): Contact => {
  switch(state) {
    case 'Florida': return {
      state,
      official: contactData.official!,
      county: contactData.county!,
      email: contactData.emails![0],
      url: contactData.url!,
    }
    case 'Georgia': return {
      state,
      official: contactData.official!,
      county: contactData.county!,
      email: maybeFirstItem(contactData.emails),
      fax: maybeFirstItem(contactData.faxes),
      url: contactData.url!,
    }
    case 'Maine': return {
      state,
      official: contactData.official!,
      city: contactData.city!,
      fax: maybeFirstItem(contactData.faxes),
    }
    case 'Maryland': return {
      state,
      official: contactData.official!,
      county: contactData.county!,
      emails: contactData.emails!,
      url: contactData.url!,
    }
    case 'Michigan': return {
      state,
      official: contactData.official!,
      city: contactData.city!,
      county: contactData.county!,
      email: contactData.emails![0],
      fax: contactData.faxes![0],
    }
    case 'Minnesota': return {
      state,
      official: contactData.official!,
      county: contactData.county!,
      email: contactData.emails![0],
      fax: contactData.faxes![0],
      url: contactData.url!,
    }
    case 'Nebraska': return {
      state,
      official: contactData.official!,
      county: contactData.county!,
      email: contactData.emails![0],
      fax: contactData.faxes![0],
      url: contactData.url!,
    }
    case 'Virginia': return {
      state,
      official: contactData.official!,
      city: contactData.city!,
      county: contactData.county!,
      email: contactData.emails![0],
      fax: contactData.faxes![0],
      url: contactData.url!,
    }
    case 'Wisconsin': return {
      state,
      official: contactData.official!,
      city: contactData.city!,
      county: contactData.county,
      email: maybeFirstItem(contactData.emails),
      fax: maybeFirstItem(contactData.faxes),
    }
  }
}
/* eslint-enable @typescript-eslint/no-non-null-assertion */

type Localize<T> = T extends Partial<Locale> ? Pick<T, keyof Locale> : never
type ContactLocale = Localize<Contact>

export const localeAdapter = (contact: ContactLocale): string => {
  switch(contact.state) {
    case 'Florida': {
      return contact.county
    }
    case 'Georgia': {
      return contact.county
    }
    case 'Maine': {
      return contact.city
    }
    case 'Maryland': {
      return contact.county
    }
    case 'Michigan': {
      return contact.city + ':' + contact.county
    }
    case 'Minnesota': {
      return contact.county
    }
    case 'Nebraska': {
      return contact.county
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

export const subAdapter = (state: AvailableState, contactDatas: ContactData[]): Record<string, Contact> => {
  const array = contactDatas.map(
    contactData => {
      const contact = contactAdapter(state, contactData)
      return [
        localeAdapter(contact),
        contact,
      ]
    }
  )
  return Object.fromEntries(array)
}

export const adapter = (records: RawContactRecord): ContactRecord => {
  const rawArray  = Object.entries(records) as Array<[AvailableState, ContactData[]]>
  const array = rawArray.map(
    ([state, contactDatas]) => [
      state,
      subAdapter(state, contactDatas)
    ]
  )
  return Object.fromEntries(array)
}
