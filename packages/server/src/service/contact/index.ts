import { ContactRecord } from './type'
import { load } from './loader'
import { normalize } from './normalize'
import { Locale, isAvailableState, ContactData } from '../../common'
import { keys } from './search'

let contactRecords: null | ContactRecord = null;

(async () => {
  const data = await load()
  contactRecords = normalize(data)
})()

export const toContact = (locale: Locale): ContactData | null => {
  if (!contactRecords) return null
  const { state } = locale
  if (!isAvailableState(state)) return null
  const stateRecords = contactRecords[state]
  for(const key of keys({...locale, state})) {
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
