import { State } from "../../common"
import fetch from 'node-fetch'

const version = 'v1.0.0'

const url = (state: State) => {
  return `https://raw.githubusercontent.com/mail-my-ballot/elections-officials/${version}/public/${state.toLowerCase()}.json`
}

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

interface Contact {
  // each contact should have a locale and either an email or fax
  locale: string            // locale name, unique within state
  official?: string         // name of election's official
  emails?: string[]         // array of emails
  faxes?: string[]          // list of fax numbers
}

type AvailableState = (typeof availableStates)[number]

const loadState = async (state: AvailableState): Promise<[AvailableState, Contact[]]> => {
  const resp = await fetch(url(state))
  return [state, await resp.json() as Contact[]]
}

export const load = async (): Promise<Record<AvailableState, Contact[]>> => {
  const data = await Promise.all(availableStates.map(state => loadState(state)))
  return Object.fromEntries(data) as Record<AvailableState, Contact[]>
}
