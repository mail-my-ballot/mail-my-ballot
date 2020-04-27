import { ContactRecord } from './type'
import { load } from './loader'
import { normalize, normaizeKey } from './normalize'
import { Locale, isAvailableState, ContactData } from '../../common'

let contactRecords: null | ContactRecord = null;

(async () => {
  const data = await load()
  contactRecords = normalize(data)
})()

export const toContact = (locale: Locale): ContactData | null => {
  if (!contactRecords) return null
  if (!isAvailableState(locale.state)) return null
  const stateRecords = contactRecords[locale.state]
  return stateRecords[normaizeKey(locale.state, locale)]
}
