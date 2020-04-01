import { createArrayCsvStringifier } from 'csv-writer'
import { RichStateInfo } from './types'

export const toCSVStingGeneral = <K extends string>(records: Record<K, any>[], keys: K[]): string => {
  const writer = createArrayCsvStringifier({
    header: keys
  })

  return (
    writer.getHeaderString() +
    writer.stringifyRecords(records.map(info => keys.map(k => info[k])))
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

export const toCSVSting = (infos: RichStateInfo[]) => {
  // Need to convert firestore TimeStamp to milliseconds since Epoch
  // https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp#todate
  // manipulatable in Google Spreadsheets:
  // https://infoinspired.com/google-docs/spreadsheet/convert-unix-timestamp-to-local-datetime-in-google-sheets/
  const records = infos.map(info => ({
    ...info,
    created: info.created.toMillis()
  } as Record<StateKeys, any>))
  return toCSVStingGeneral(records, keys)
}
