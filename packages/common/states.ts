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
  state: State
  name: string
  email: string
  phone: string
  birthdate: string
  uspsAddress: string
  mailingAddress?: string
  signature?: string
  oid: string
  ip?: string
  userAgent?: string
}

export interface FloridaInfo extends _Id, BaseInfo {
  state: 'Florida'
}

export interface MichiganInfo extends _Id, BaseInfo {
  state: 'Michigan'
  signature: string
}

export interface GeorgiaInfo extends _Id, BaseInfo {
  // mailingAddress must be in a different county
  // https://sos.ga.gov/admin/uploads/Absentee_Voting_A_Guide_for_Registered_Voters_2017.pdf
  state: 'Georgia'
  electionType: string  // Type of election (presidential preference primary, general primary, primary runoff, municipal, municipal runoff, special, general, general runoff)
  electionDate: string
  party?: 'Democratic' | 'Republican' | 'Non-Partisan' // Name of party ballot being requested (for primaries)
  signature: string
}

export interface WisconsinInfo extends _Id, BaseInfo {
  // https://elections.wi.gov/sites/elections.wi.gov/files/2020-03/EL-121%20Application%20for%20Absentee%20Ballot%20%282018-10%29.pdf
  state: 'Wisconsin'
  ballotMethod: string  // will stick to mail but can be fax, email, or in-person
}

export type StateInfo = (
  | FloridaInfo
  | MichiganInfo
  | GeorgiaInfo
  | WisconsinInfo
)
