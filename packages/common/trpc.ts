import { IRpc, RpcRet } from '@tianhuil/simple-trpc/dist/type'
import { Address } from './address'
import { StateInfo, State } from './states'
import { ContactData } from './contact'
import { Analytics } from './analytics'

export interface IVbmRpc extends IRpc<IVbmRpc> {
  add(x: number, y: number): Promise<RpcRet<number>>
  fetchState(zip: string): Promise<RpcRet<State>>
  fetchAnalytics(org: string): Promise<RpcRet<Analytics>>
  fetchContactAddress(addr: string): Promise<RpcRet<{contact: ContactData, address: Address}>>
  register(info: StateInfo): Promise<RpcRet<string>>
}
