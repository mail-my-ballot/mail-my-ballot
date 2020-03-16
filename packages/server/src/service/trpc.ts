import { data, error } from '@tianhuil/simple-trpc/dist/util'
import { IVbmRpc, WithoutId, Address, StateInfo, isState, State, Locale } from '../common'
import { firestoreService } from './firestore'
import { sendEmail } from './mg'
import { toEmailData } from './email'
import { getContact } from './contact'

export class VbmRpc implements IVbmRpc {
  public add = async (x: number, y: number) => data(x + y)
  public addAddress = async(address: WithoutId<Address>) => {
    const id = await firestoreService.addAddress(address)
    const { city, county, state } = address
    if (!isState(state)) return data({id, contact: null})
    const contact = getContact({ city, county, state })
    return data({id, contact})
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
