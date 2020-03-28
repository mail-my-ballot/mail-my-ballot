import { keys } from 'ts-transformer-keys'
import { createObjectCsvStringifier } from 'csv-writer'
import { RichStateInfo } from './types'

export const toCSVStingGeneral = <R extends Record<string, any>>(infos: R[], keys: string[]): string => {
  const writer = createObjectCsvStringifier({
    header: keys
  })

  return (
    writer.getHeaderString() +
    writer.stringifyRecords(infos)
  )
}

type KeysOfUnion<T> = T extends any ? keyof T: never
type WideStateInfo = Record<KeysOfUnion<RichStateInfo>, any>
const wideKeys = keys<WideStateInfo>()

export const toCSVSting = (infos: RichStateInfo[]) => toCSVStingGeneral<RichStateInfo>(infos, wideKeys)
