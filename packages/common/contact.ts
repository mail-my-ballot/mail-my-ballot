export const availableStates = [
  'Florida',
  'Georgia',
  'Maine',
  'Maryland',
  'Michigan',
  'Minnesota',
  'Nebraska',
  'Nevada',
  'Virginia',
  'Wisconsin'
] as const

const availableStatesSet = new Set(availableStates)
export type AvailableState = (typeof availableStates)[number]

export const isAvailableState = (str: string): str is AvailableState => {
  return availableStatesSet.has(str as AvailableState)
}

const allowableMethods: Record<AvailableState, ('Fax' | 'Email')[]> = {
  'Florida': ['Fax', 'Email'],
  'Georgia': ['Fax', 'Email'],
  'Michigan': ['Fax', 'Email'],
  'Wisconsin': ['Fax', 'Email'],
  'Nebraska': ['Fax', 'Email'],
  'Maine': ['Fax'],
  'Maryland': ['Fax'],
  'Nevada': ['Fax'],
  'Virginia': ['Fax', 'Email'],
  'Minnesota': ['Fax', 'Email'],
}

const getAllowableMethods = (state: AvailableState): ('Fax' | 'Email')[] => {
  return allowableMethods[state]
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

export type ContactMethod = {
  emails: string[]
  faxes: string[]
}

const toAllowableMethod = (contact: ContactData): Partial<ContactMethod> | null => {
  const emailAllowed = getAllowableMethods(contact.state).includes('Email')
  const faxAllowed = getAllowableMethods(contact.state).includes('Fax')

  const { emails, faxes } = contact

  // send only email if we have it, send fax if we don't
  if (emailAllowed && faxAllowed) return emails ? { emails } : { faxes }

  // send emails since faxes are not allowed
  if (emailAllowed && !faxAllowed) return { emails }

  // email is preferred so send in addition to mandatory fax
  if (!emailAllowed && faxAllowed) return { emails, faxes }

  // cannot send anything (for completeness)
  return null
}

/** Returns a ContactMethod or null.  Always returns null if no email or fax numbers allowed */
export const toContactMethod = (contact: ContactData | null): ContactMethod | null => {
  if (!contact) return null
  const method = toAllowableMethod(contact)
  if (!method) return null
  const { emails, faxes } = method
  const normalizedMethod = { 
    emails: emails ?? [],
    faxes: faxes ?? []
  }

  if ((normalizedMethod.emails.length === 0) && (normalizedMethod.faxes.length === 0)) {
    return null
  } else {
    return normalizedMethod
  }
}
