import { State, processEnvOrThrow, Locale, Contact } from "../../common"
import fetch from 'node-fetch'
import { AvailableState, ContactData, availableStates, RawContactRecord, ContactRecord, isAvailableState } from "./type"
import { adapter, localeAdapter } from "./adapter"

const version = processEnvOrThrow('ELECTIONS_OFFICIALS_VERSION')

const url = (state: State) => {
  return `https://raw.githubusercontent.com/mail-my-ballot/elections-officials/${version}/public/${state.toLowerCase()}.json`
}

let contactRecords: null | ContactRecord = null

export const loadState = async (state: AvailableState): Promise<[AvailableState, ContactData[]]> => {
  const resp = await fetch(url(state))
  return [state, await resp.json() as ContactData[]]
}

export const load = async (): Promise<RawContactRecord> => {
  const records = await Promise.all(availableStates.map(state => loadState(state)))
  return Object.fromEntries(records) as RawContactRecord
}

(async () => {
  const data = await load()
  contactRecords = adapter(data)
})()

export const search = (locale: Locale): null | Contact => {
  if (!contactRecords) return null
  const { state, city, county } = locale
  if (!isAvailableState(state)) return null
  const stateRecords = contactRecords[state]
  return stateRecords[localeAdapter({ state, city, county })]
}
