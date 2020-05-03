import { IRpc, RpcRet } from '@tianhuil/simple-trpc/dist/type'
import { Address } from './address'
import { StateInfo } from './states'
import { ContactData } from './contact'
import { Analytics } from './analytics'

export interface IVbmRpc extends IRpc<IVbmRpc> {
  add(x: number, y: number): Promise<RpcRet<number>>
  fetchAnalytics(org: string): Promise<RpcRet<Analytics>>
  fetchContact(address: Address): Promise<RpcRet<ContactData | null>>
  register(info: StateInfo): Promise<RpcRet<string>>
}
