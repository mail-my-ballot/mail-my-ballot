import { State } from './states'

export interface BaseContact {
  state: State
  county?: string
  city?: string
  official: string
  emails?: string[]
  faxes?: string[]
}

export interface FloridaContact extends BaseContact {
  state: "Florida"
  county: string
  email: string
  url: string
}

export interface GeorgiaContact extends BaseContact {
  state: "Georgia"
  county: string
  email?: string
  fax?: string
  url: string
}

export interface MaineContact extends BaseContact {
  state: "Maine"
  city: string
  fax?: string
}

export interface MarylandContact extends BaseContact {
  state: "Maryland"
  county: string
  emails: string[]
  url: string
}

export interface MichiganContact extends BaseContact {
  state: "Michigan"
  city: string
  county: string
  email: string
  fax: string
}

export interface MinnesotaContact extends BaseContact {
  state: "Minnesota"
  county: string
  email: string
  fax: string
  url: string
}

export interface NebraskaContact extends BaseContact {
  state: "Nebraska"
  county: string
  email: string
  fax: string
  url: string
}

export interface VirginiaContact extends BaseContact {
  state: "Virginia"
  city?: string
  county?: string
  email: string
  fax: string
  url?: string
}

export interface WisconsinContact extends BaseContact {
  state: "Wisconsin"
  city: string
  county?: string
  email?: string
  fax?: string
}

export type Contact = (
  | FloridaContact
  | GeorgiaContact
  | MaineContact
  | MarylandContact
  | MichiganContact
  | MinnesotaContact
  | NebraskaContact
  | VirginiaContact
  | WisconsinContact
)
