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

export interface BaseInfo extends Locale {
  state: State
  name: string
  email: string
  phone: string
  birthdate: string
  uspsAddress: string
  mailingAddress?: string
  oid: string
  ip?: string
  userAgent?: string
  signature?: string
}

interface SignatureBaseInfo extends BaseInfo {
  signature: string
}

export interface FloridaInfo extends _Id, SignatureBaseInfo {
  state: 'Florida'
}

export interface MichiganInfo extends _Id, SignatureBaseInfo {
  state: 'Michigan'
}

export interface GeorgiaInfo extends _Id, SignatureBaseInfo {
  // mailingAddress must be in a different county
  // https://sos.ga.gov/admin/uploads/Absentee_Voting_A_Guide_for_Registered_Voters_2017.pdf
  // Must specify type of election (presidential preference primary, general primary, primary runoff, municipal, municipal runoff, special, general, general runoff)
  state: 'Georgia'
  party?: 'Democratic' | 'Republican' | 'Non-Partisan' // Name of party ballot being requested (for primaries)
}

export interface WisconsinInfo extends _Id, BaseInfo {
  // https://elections.wi.gov/sites/elections.wi.gov/files/2019-02/Faxing%20or%20Emailing%20Absentee%20Ballots.pdf
  // no signature required
  // Wisconsin allows ballots by fax, email, or in-person, but we will stick to mail
  state: 'Wisconsin'
}

export interface NebraskaInfo extends _Id, SignatureBaseInfo {
  state: 'Nebraska'
}

export interface MaineInfo extends _Id, SignatureBaseInfo {
  state: 'Maine'
}

export interface MarylandInfo extends _Id, SignatureBaseInfo {
  state: 'Maryland'
}

export interface NevadaInfo extends _Id, SignatureBaseInfo {
  state: 'Nevada'
}

export type StateInfo = (
  | FloridaInfo
  | MichiganInfo
  | GeorgiaInfo
  | WisconsinInfo
  | NebraskaInfo
  | MaineInfo
  | MarylandInfo
  | NevadaInfo
)
