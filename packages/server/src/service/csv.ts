import { createArrayCsvStringifier } from 'csv-writer'
import { RichStateInfo } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selector = (obj: Record<string, any>, key: string | string[]): string => {
  if (key instanceof Array) {
    if (key.length === 0) {
      return String(obj)
    } else {
      const key0 = key[0]
      if (!obj) return obj
      return selector(obj[key0] as object, key.splice(1))
    }
  } else {
    return selector(obj, key.split('.'))
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toCSVStingGeneral = (records: Record<string, any>[], keys: string[]): string => {
  const writer = createArrayCsvStringifier({
    header: keys
  })

  return (
    writer.getHeaderString() +
    writer.stringifyRecords(
      records.map(
        info => keys.map(
          k => selector(info, k)
        )
      )
    )
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type KeysOfUnion<T> = T extends any ? keyof T: never
type StateKeys = KeysOfUnion<RichStateInfo>

// Must keep this list manually updated
const simpleKeys: StateKeys[] = [
  'created',
  'id',
  'ip',
  'userAgent',
  'oid',
  'name',
  'state',
  'city',
  'county',
  'uspsAddress',
  'mailingAddress',
  'birthdate',
  'email',
  'phone',
]

const compoundKeys: string[] = [
  'voter.uid',
  'voter.utmSource',
  'voter.utmMedium',
  'voter.utmCampaign',
  'voter.utmTerm',
  'voter.utmContent',
  'mgResponse.id',
]

export const toCSVSting = (infos: RichStateInfo[]) => {
  // Need to convert firestore TimeStamp to milliseconds since Epoch
  // https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp#todate
  // manipulatable in Google Spreadsheets:
  // https://infoinspired.com/google-docs/spreadsheet/convert-unix-timestamp-to-local-datetime-in-google-sheets/
  const records = infos.map(info => ({
    ...info,
    created: info.created.toMillis()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as Record<StateKeys, any>))
  return toCSVStingGeneral(records, (simpleKeys as string[]).concat(compoundKeys))
}
