import { State, processEnvOrThrow, AvailableState, availableStates } from "../../common"
import fetch from 'node-fetch'
import { RawContactRecord, RawContact } from "./type"

const version = processEnvOrThrow('ELECTIONS_OFFICIALS_VERSION')

const url = (state: State) => {
  const stateStr = state.toLowerCase().replace(' ', '_')
  return `https://raw.githubusercontent.com/mail-my-ballot/elections-officials/${version}/public/${stateStr}.json`
}

export const loadState = async (state: AvailableState): Promise<[AvailableState, RawContact[]]> => {
  const resp = await fetch(url(state))
  return [state, await resp.json() as RawContact[]]
}

export const loadStates = async (): Promise<RawContactRecord> => {
  const startTime = new Date()
  const records = await Promise.all(availableStates.map(state => loadState(state)))
  const ret = Object.fromEntries(records) as RawContactRecord
  const endTime = new Date()
  const seconds = (endTime.getTime() - startTime.getTime()) / 1000.
  console.info(`Successfully loaded contact data for ${availableStates.length} states in ${seconds} seconds`)
  return ret
}
