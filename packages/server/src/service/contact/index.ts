import { ContactRecord } from './type'
import { loadStates } from './loader'
import { normalizeStates } from './normalize'
import { Locale, isAvailableState, ContactData, AvailableState } from '../../common'
import { keys } from './search'

let contactRecords: null | ContactRecord = null;

(async (): Promise<void> => {
  const data = await loadStates()
  contactRecords = normalizeStates(data)
})()

const delay = (t: number): Promise<void> => new Promise(resolve => setTimeout(resolve, t))

/** poll condition every interval millis for a total of timeout millis until condition is true, false otherwise */
const poll = async (condition: () => boolean, interval: number, timeout: number): Promise<boolean> => {
  if (condition()) return true
  if (timeout <= 0) return false
  await delay(interval)
  return await poll(condition, interval, timeout - interval)
}

export const getContactRecords = async (): Promise<ContactRecord> => {
  await poll(() => !!contactRecords, 100, 5000)
  if (!contactRecords) throw Error('Unable to load data')
  return contactRecords
}

export const toContact = async (locale: Locale): Promise<ContactData | null> => {
  const { state } = locale
  if (!isAvailableState(state)) return null
  const stateRecords = (await getContactRecords())[state]
  for (const key of keys(locale as Locale<AvailableState>)) {
    const stateless = stateRecords[key]
    if (stateless) {
      return {
        ...stateless,
        state,
      }
    }
  }
  return null
}
