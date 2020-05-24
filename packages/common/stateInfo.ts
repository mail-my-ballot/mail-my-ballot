import { _Id } from './util'
import { Locale } from './locale'
import { ExtendsState } from './states'

// States for which we now support
export const implementedStates = [
  'Arizona',
  'Florida',
  'Michigan',
  'Georgia',
  'Wisconsin',
  'Nebraska',
  'Maine',
  'Maryland',
  'Nevada',
] as const
export type ImplementedState = ExtendsState<(typeof implementedStates)[number]>
const implementedStateSet = new Set<string>(implementedStates)
export const isImplementedState = (x: string): x is ImplementedState => implementedStateSet.has(x)
export type ImplementedStateField = {state: ImplementedState}
export const isImplementedLocale = (l: Locale): l is Locale<ImplementedState> => implementedStateSet.has(l.state)

export interface BaseInfo extends Locale {
  state: ImplementedState
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
  idPhoto?: string
}

interface SignatureBaseInfo extends BaseInfo {
  signature: string
}

export interface ArizonaInfo extends _Id, BaseInfo{
  state: 'Arizona'
}

export interface FloridaInfo extends _Id, SignatureBaseInfo{
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
  idPhoto?: string
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
  idPhoto?: string
}

export type StateInfo = (
  | ArizonaInfo
  | FloridaInfo
  | MichiganInfo
  | GeorgiaInfo
  | WisconsinInfo
  | NebraskaInfo
  | MaineInfo
  | MarylandInfo
  | NevadaInfo
)
