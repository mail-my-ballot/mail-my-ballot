import fetch from 'node-fetch'

import { State, processEnvOrThrow, AvailableState, availableStates } from "../../common"
import { RawContactRecord, RawContact, ContactRecord } from "./type"
import { normalizeStates } from "./normalize"

// Local Contact Records
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

export const loadMichigan = async (
  data: Record<string, RawContact>
): Promise<Record<string, RawContact & { key: string }>> => {
  return Object.fromEntries(
    Object.entries(data)
      .map(([key, rec]) => [(rec as { fipscode: string }).fipscode, {...rec, key}])
  )
}

// Utility Functions
const delay = (t: number): Promise<void> => new Promise(resolve => setTimeout(resolve, t))

/** poll condition every interval millis for a total of timeout millis until condition is true, false otherwise */
const poll = async (condition: () => boolean, interval: number, timeout: number): Promise<boolean> => {
  if (condition()) return true
  if (timeout <= 0) return false
  await delay(interval)
  return await poll(condition, interval, timeout - interval)
}

// Loading ContactRecords
let contactRecords: null | ContactRecord = null
let michiganRecords: null | Record<string, RawContact & { key: string }> = null;

(async (): Promise<void> => {
  const data = await loadStates()
  contactRecords = normalizeStates(data)
  michiganRecords = await loadMichigan(contactRecords['Michigan'])
})()

export const getContactRecords = async (): Promise<ContactRecord> => {
  await poll(() => !!contactRecords, 100, 5000)
  if (!contactRecords) throw Error('Unable to load Contact Records')
  return contactRecords
}

export const getMichiganRecords = async (): Promise<Record<string, RawContact>> => {
  await poll(() => !!michiganRecords, 100, 5000)
  if (!michiganRecords) throw Error('Unable to load Michigan Data')
  return michiganRecords
}
