import { data } from '@tianhuil/simple-trpc/dist/util'
import { IVbmRpc, WithoutId, Address, RegistrationInfo } from '../common'
import { FirestoreService } from './firestore'

const firestore = new FirestoreService()

export class VbmRpc implements IVbmRpc {
  public add = async (x: number, y: number) => data(x + y)
  public addLocale = async (address: WithoutId<Address>) => {
    const id = await firestore.addLocale(address)
    return data(id)
  }
  public register = async (info: RegistrationInfo) => {
    const id = await firestore.addRegistration(info)
    return data(id)
  }
}
