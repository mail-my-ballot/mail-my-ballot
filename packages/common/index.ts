// interface.ts
import { IRpc, RpcRet } from '@tianhuil/simple-trpc/dist/type'

export interface _Id {
  id?: string
}

export interface Address extends _Id {
  queryAddr: string
  fullAddr: string
  houseNumber: string,
  road: string,
  apartment: string,
  city: string
  state: string
  postcode: string
  country: string
  county: string
}

export interface FloridaInfo extends _Id {
  name: string
  birthdate: string
  email: string
  address: string
}

export type RegistrationInfo = FloridaInfo

export type WithoutId<T extends _Id> = Omit<T, 'id'>
export type WithId<T extends _Id> = WithoutId<T> & {id: string}

export interface IVbmRpc extends IRpc<IVbmRpc> {
  add(x: number, y: number): Promise<RpcRet<number>>
  addLocale(address: WithoutId<Address>): Promise<RpcRet<string>>
  register(info: RegistrationInfo): Promise<RpcRet<string>>
}

export function processEnvOrThrow(key: string): string {
  const val = process.env[key]
  if (!val) throw new Error(`Need to set environment variable ${key}`)
  return val
}
