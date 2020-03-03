// interface.ts
import { IRpc, RpcRet } from '@tianhuil/simple-trpc/dist/type'

export interface IVbmRpc extends IRpc<IVbmRpc> {
  add(x: number, y: number): Promise<RpcRet<number>>
}

export interface Locale {
  id: string
  queryAddr: string
  fullAddr: string
  country: string
  zip: string
  state: string
  county: string
  city: string
}

export type RawLocale = Omit<Locale, 'id'>

export function processEnvOrThrow(key: string): string {
  const val = process.env[key]
  if (!val) throw new Error(`Need to set environment variable ${key}`)
  return val
}
