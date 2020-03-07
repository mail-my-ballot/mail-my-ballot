import { data, error } from '@tianhuil/simple-trpc/dist/util'
import { IVbmRpc, WithoutId, Address, StateInfo } from '../common'
import { firestoreService } from './firestore'
import { sendEmail } from './mg'
import { toEmailData } from './states'

export class VbmRpc implements IVbmRpc {
  public add = async (x: number, y: number) => data(x + y)
  public addLocale = async (address: WithoutId<Address>) => {
    const id = await firestoreService.addLocale(address)
    return data(id)
  }
  public register = async (info: StateInfo) => {
    const id = await firestoreService.addRegistration(info)
    const emailData = toEmailData(info)
    if (emailData) {
      await sendEmail(emailData)
      return data(id)
    } else {
      return error('Unable to find an appropriate email to send')
    }
  }
}
