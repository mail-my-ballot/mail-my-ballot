import { data, error } from '@tianhuil/simple-trpc/dist/util'
import { IVbmRpc } from '@vbm/common'

export class VbmRpc implements IVbmRpc {
  public add = async (x: number, y: number) => data(x + y)
}
