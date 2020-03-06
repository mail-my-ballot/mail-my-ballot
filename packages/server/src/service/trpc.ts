import { data, error } from '@tianhuil/simple-trpc/dist/util'
import { IVbmRpc, WithoutId, Address, RegistrationInfo } from '../common'
import { firestoreService } from './firestore'
import { sendMdEmail } from './mg'
import { toEmail } from './states'

export class VbmRpc implements IVbmRpc {
  public add = async (x: number, y: number) => data(x + y)
  public addLocale = async (address: WithoutId<Address>) => {
    const id = await firestoreService.addLocale(address)
    return data(id)
  }
  public register = async (info: RegistrationInfo) => {
    const id = await firestoreService.addRegistration(info)
    const mdEmailData = toEmail(info)
    if (mdEmailData) {
      await sendMdEmail(mdEmailData)
      return data(id)
    } else {
      return error('Unable to find an appropriate email to send')
    }
  }
}
