import { Contact } from "../../common"

export const availableStates = [
  'Florida',
  'Georgia',
  'Maine',
  'Maryland',
  'Michigan',
  'Minnesota',
  'Nebraska',
  'Virginia',
  'Wisconsin'
] as const

const availableStatesSet = new Set(availableStates)

export const isAvailableState = (str: string): str is AvailableState => {
  return availableStatesSet.has(str as AvailableState)
}

export interface ContactData {
  // each contact should have a locale and either an email or fax
  locale: string // locale name, unique within state
  city?: string
  county?: string
  official?: string // name of election's official
  emails?: string[] // array of emails
  faxes?: string[] // list of fax numbers
  phones?: string[]
  url?: string
}

export type AvailableState = (typeof availableStates)[number]

export type RawContactRecord = Record<AvailableState, ContactData[]>

export type ContactRecord = Record<AvailableState, Record<string, Contact>>
