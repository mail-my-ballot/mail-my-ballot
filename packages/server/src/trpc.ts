import { data, error } from '@tianhuil/simple-trpc/dist/util'
import { IVbmRpc, RawLocale } from '@vbm/common'
import { FirestoreService } from './firestore'

const firestore = new FirestoreService()

export class VbmRpc implements IVbmRpc {
  public add = async (x: number, y: number) => data(x + y)
  public addLocale = async (locale: RawLocale) => {
    const id = await firestore.addLocale(locale)
    return data(id)
  }
}
