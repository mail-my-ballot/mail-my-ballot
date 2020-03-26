import { IRpc, RpcRet } from '@tianhuil/simple-trpc/dist/type'
import { Address } from './address'
import { StateInfo } from './states'
import { Contact } from './contact'

export interface IVbmRpc extends IRpc<IVbmRpc> {
  add(x: number, y: number): Promise<RpcRet<number>>
  fetchState(zip: string): Promise<RpcRet<string>>
  fetchContact(address: Address): Promise<RpcRet<Contact | null>>
  register(info: StateInfo): Promise<RpcRet<string>>
}
