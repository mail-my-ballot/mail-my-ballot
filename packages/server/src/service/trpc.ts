import { data, error } from '@tianhuil/simple-trpc/dist/util'
import { IVbmRpc, WithoutId, Address, StateInfo, toLocale } from '../common'
import { firestoreService } from './firestore'
import { sendEmail } from './mg'
import { toEmailData } from './email'
import { toContact } from './contact'
import { search } from './zip'

export class VbmRpc implements IVbmRpc {
  public add = async (x: number, y: number) => data(x + y)
  public state = async (zip: string) => {
    const res = search(zip)
    return res ? data(res) : error(`Unable to find zip ${zip}`)
  }
  public addAddress = async(address: WithoutId<Address>) => {
    const id = await firestoreService.addAddress(address)
    const locale = toLocale(address)
    if (!locale) return data({id, contact: null})
    const contact = toContact(locale)
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
