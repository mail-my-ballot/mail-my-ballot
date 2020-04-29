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
  state: AvailableState
  city?: string
  county?: string
  official?: string // name of election's official
  emails?: string[] // array of emails
  faxes?: string[] // list of fax numbers
  phones?: string[]
  url?: string
}

export type AvailableState = (typeof availableStates)[number]

interface EmailMethod {
  method: 'email'
  emails: string[]
}

interface FaxMethod {
  method: 'fax'
  faxes: string[]
}

export type ContactMethod  = EmailMethod| FaxMethod

export const toContactMethod = (contact: ContactData | null): ContactMethod | null => {
  if (!contact) return null
  if (contact.emails) return { emails: contact.emails, method: 'email' }
  if (contact.faxes) return { faxes: contact.faxes, method: 'fax' }
  return null
}
