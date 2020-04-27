import { _Id } from './util'
import { Locale } from './locale'

export const allStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
] as const

export type State = (typeof allStates)[number]
const allStatesSet = new Set(allStates)
export const isState = (x: string): x is State => allStatesSet.has(x as State)
export type StateField = {state: State}

interface BaseInfo extends Locale {
  oid: string
  ip?: string
  userAgent?: string
}

export interface FloridaInfo extends _Id, BaseInfo {
  state: 'Florida'
  name: string
  birthdate: string
  email: string
  uspsAddress: string
  mailingAddress?: string
  phone?: string
}

export interface MichiganInfo extends _Id, BaseInfo {
  state: 'Michigan'
  name: string
  uspsAddress: string
  email: string
  phone: string
  birthyear: string
  mailingAddress?: string
  signature: string
}

export type StateInfo = (
  | FloridaInfo
  | MichiganInfo
)
