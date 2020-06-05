import { IRpc, RpcRet } from '@tianhuil/simple-trpc/dist/type'
import { Address } from './address'
import { State } from './states'
import { ContactData } from './contact'
import { Analytics } from './analytics'
import { FeatureFlags } from './featureFlags'
import { StateInfo, ImplementedState } from './stateInfo'
import { Voter } from './voter'
import { Locale } from './locale'

export interface IVbmRpc extends IRpc<IVbmRpc> {
  add(x: number, y: number): Promise<RpcRet<number>>
  fetchState(zip: string): Promise<RpcRet<State>>
  fetchAnalytics(org: string): Promise<RpcRet<Analytics>>
  fetchFeatureFlags(): Promise<RpcRet<FeatureFlags>>
  fetchContactAddress(addr: string): Promise<RpcRet<{contact: ContactData, address: Address}>>
  fetchContact(locale: Locale): Promise<RpcRet<ContactData>>
  fetchContacts(state: ImplementedState): Promise<RpcRet<string[]>>
  getContact(state: ImplementedState, key: string): Promise<RpcRet<ContactData>>
  register(info: StateInfo, voter: Voter): Promise<RpcRet<string>>
}
