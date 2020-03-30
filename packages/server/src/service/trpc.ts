import { data, error } from '@tianhuil/simple-trpc/dist/util'
import { IVbmRpc, Address, StateInfo, toLocale } from '../common'
import { FirestoreService } from './firestore'
import { sendEmail } from './mg'
import { toEmailData } from './email'
import { toContact } from './contact'
import { search } from './zip'

const firestoreService = new FirestoreService()

export class VbmRpc implements IVbmRpc {
  public add = async (x: number, y: number) => data(x + y)
  public fetchState = async (zip: string) => {
    const res = search(zip)
    return res ? data(res) : error(`Unable to find zip ${zip}`)
  }
  public fetchContact = async(address: Address) => {
    const locale = toLocale(address)
    if (!locale) return data(null)
    const contact = toContact(locale)
    return data(contact)
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
