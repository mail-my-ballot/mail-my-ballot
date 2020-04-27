import { data, error } from '@tianhuil/simple-trpc/dist/util'
import { ImplRpc } from '@tianhuil/simple-trpc/dist/type'
import { Request } from 'express'
import { IVbmRpc, Address, StateInfo, toLocale, toContactMethod } from '../common'
import { FirestoreService } from './firestore'
import { sendEmail } from './mg'
import { toEmailData } from './email'
import { toContact } from './contact'
import { search } from './zip'

const firestoreService = new FirestoreService()

interface HostInfo {
  ip?: string
  userAgent?: string
}

const hostInfo = (request: Request): HostInfo => {
  // https://stackoverflow.com/questions/10849687/express-js-how-to-get-remote-client-address
  return {
    ip: request.connection.remoteAddress,
    userAgent: request.headers['user-agent'],
  }
}

export class VbmRpc implements ImplRpc<IVbmRpc, Request> {
  public add = async (x: number, y: number) => data(x + y)
  public fetchAnalytics = async (org: string) => {
    const orgObj = await firestoreService.fetchOrg(org)
    return data({
      facebookId: orgObj?.facebookId,
      googleId: orgObj?.googleId,
    })
  }
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
  public register = async (info: StateInfo, request: Request) => {
    const id = await firestoreService.addRegistration({
      ...info,
      ...hostInfo(request)
    })

    const contact = toContact(info)
    if (!contact) return error('Unable to find local official')

    const method = toContactMethod(contact)
    if (!method) return error('Unable to find contct details for local official')

    switch(method.method) {
      case 'email': {
        const emailData = toEmailData(info, id, method.emails)
        if (emailData) {
          await sendEmail(emailData)
          return data(id)
        } 
        break
      }
      case 'fax': {
        return error('Fax not yet implemented')
      }
    }
    return error('Unable to find an appropriate email to send')
  }
}
