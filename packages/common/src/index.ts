// interface.ts
import { IRpc, RpcRet } from '@tianhuil/simple-trpc'

export interface IVbmRpc extends IRpc<IVbmRpc> {
  add(x: number, y: number): Promise<RpcRet<number>>
}
