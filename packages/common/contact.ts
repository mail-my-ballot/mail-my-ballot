import { State } from './states'

interface BaseContact {
  state: State
}

export interface MichiganContact extends BaseContact {
  state: "Michigan"
  city: string
  county: string
  clerk: string
  email: string | null
  fax: string
  phone: string
}

export interface FloridaContact extends BaseContact{
  state: "Florida"
  county: string
  clerk: string
  email: string
  url: string
}

export type Contact = (
  | MichiganContact
  | FloridaContact
)
