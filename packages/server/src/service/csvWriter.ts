import { createArrayCsvStringifier } from 'csv-writer'
import { RichStateInfo } from './types'

export const toCSVStingGeneral = <K extends string>(infos: Record<K, any>[], keys: K[]): string => {
  const writer = createArrayCsvStringifier({
    header: keys
  })

  return (
    writer.getHeaderString() +
    writer.stringifyRecords(infos.map(info => keys.map(k => info[k])))
  )
}

type KeysOfUnion<T> = T extends any ? keyof T: never
type StateKeys = KeysOfUnion<RichStateInfo>

// Must keep this list manually updated
const keys: StateKeys[] = [
  'created',
  'id',
  'org',
  'name',
  'state',
  'city',
  'county',
  'uspsAddress',
  'mailingAddress',
  'birthdate',
  'birthyear',
  'email',
  'phone',
]

export const toCSVSting = (infos: RichStateInfo[]) => toCSVStingGeneral(infos as Record<StateKeys, any>[], keys)
