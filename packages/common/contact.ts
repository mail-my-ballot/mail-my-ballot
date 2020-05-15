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

type StateMethod = 'fax' | 'fax-email' | 'email'

const stateMethods: Record<AvailableState, StateMethod> = {
  'Florida': 'fax-email',
  'Georgia': 'fax-email',
  'Michigan': 'fax-email',
  'Wisconsin': 'fax-email',
  'Nebraska': 'fax-email',
  'Maine': 'fax',
  'Maryland': 'fax',
  'Nevada': 'fax',
  'Virginia': 'fax-email',
  'Minnesota': 'fax-email',
}

export type ContactMethod = {
  stateMethod: StateMethod
  emails: string[]
  faxes: string[]
}

export const toStateMethod = (state: AvailableState): StateMethod => {
  return stateMethods[state]
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

export type PartialContactMethod = {
  stateMethod: StateMethod
  emails?: string[]
  faxes?: string[]
}

const toAllowableMethod = (contact: ContactData): PartialContactMethod => {
  const stateMethod = toStateMethod(contact.state)

  const { emails, faxes } = contact

  switch(stateMethod) {
    // send only email if we have it, send fax if we don't
    case 'fax-email': return emails ? { stateMethod, emails } : { stateMethod, faxes }

    // send emails since faxes are not allowed
    case 'email': return { stateMethod, emails }

    // email is preferred so send in addition to mandatory fax
    case 'fax': return { stateMethod, emails, faxes }
  }
}

/** Returns a ContactMethod or null.  Always returns null if no email or fax numbers allowed */
export const toContactMethod = (contact: ContactData | null): ContactMethod | null => {
  if (!contact) return null
  const method = toAllowableMethod(contact)

  const { stateMethod, emails, faxes } = method

  const normalizedMethod = { 
    emails: emails ?? [],
    faxes: faxes ?? []
  }

  if ((normalizedMethod.emails.length === 0) && (normalizedMethod.faxes.length === 0)) {
    return null
  } else {
    return {
      ...normalizedMethod,
      stateMethod,
    }
  }
}
