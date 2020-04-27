import { State, processEnvOrThrow, AvailableState, ContactData, availableStates } from "../../common"
import fetch from 'node-fetch'
import { RawContactRecord } from "./type"

const version = processEnvOrThrow('ELECTIONS_OFFICIALS_VERSION')

const url = (state: State) => {
  return `https://raw.githubusercontent.com/mail-my-ballot/elections-officials/${version}/public/${state.toLowerCase()}.json`
}

export const loadState = async (state: AvailableState): Promise<[AvailableState, ContactData[]]> => {
  const resp = await fetch(url(state))
  return [state, await resp.json() as ContactData[]]
}

export const load = async (): Promise<RawContactRecord> => {
  const records = await Promise.all(availableStates.map(state => loadState(state)))
  return Object.fromEntries(records) as RawContactRecord
}
