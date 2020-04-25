import { State } from './states'

interface BaseContact {
  state: State
  official: string
  emails?: string[]
  faxes?: string[]
}

export interface MichiganContact extends BaseContact {
  state: "Michigan"
  city: string
  county: string
  emails: string[]
  faxes: string[]
  phones: string[]
}

export interface FloridaContact extends BaseContact{
  state: "Florida"
  county: string
  emails: string[]
  url: string
}

export type Contact = (
  | MichiganContact
  | FloridaContact
)
