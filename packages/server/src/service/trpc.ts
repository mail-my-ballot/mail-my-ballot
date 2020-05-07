import { data, error } from '@tianhuil/simple-trpc/dist/util'
import { ImplRpc } from '@tianhuil/simple-trpc/dist/type'
import { Request } from 'express'
import { IVbmRpc, StateInfo, toLocale, toContactMethod, isState } from '../common'
import { FirestoreService } from './firestore'
import { sendEmail } from './mg'
import { toEmailData } from './email'
import { toContact } from './contact'
import { geocode } from './gm'
import { toPdfBuffer } from './pdf'
import { StorageFile } from './storage'
import { toLetter } from './letter'
import { sendFax } from './twillio'

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
  public add = async (_: Request, x: number, y: number) => data(x + y)
  public fetchAnalytics = async (_: Request, org: string) => {
    const orgObj = await firestoreService.fetchOrg(org)
    return data({
      facebookId: orgObj?.facebookId,
      googleId: orgObj?.googleId,
    })
  }
  public fetchState = async (_: Request, zip: string) => {
    const address = await geocode(`${zip} United States`)
    if (!address || !isState(address.state)) return error('Geocoding Error')
    return data(address.state)
  }
  public fetchContactAddress = async(_: Request, addr: string) => {
    const address = await geocode(addr)
    if (!address) return error('Unable to geocode address')
    const locale = toLocale(address)
    if (!locale) return error('Unable to obtain locale')
    const contact = await toContact(locale)
    if (!contact) return error('Unable to find contact')
    return data({contact, address})
  }
  public register = async (request: Request, info: StateInfo) => {
    const id = await firestoreService.addRegistration({
      ...info,
      ...hostInfo(request)
    })

    const contact = await toContact(info)
    if (!contact) return error('Unable to find local official')

    const method = toContactMethod(contact)
    if (!method) return error('Unable to find contct details for local official')

    const letter = toLetter(info, id)
    if (!letter) return error('Unable to generate letter')

    return data(id, async (): Promise<void> => {
      const pdfBuffer = await toPdfBuffer(letter.html)
      const file = new StorageFile(`letter/${id}.pdf`)
      await file.upload(pdfBuffer)

      // Send email (perhaps only to voter)
      const emailData = toEmailData(
        letter,
        info.email,
        method.emails,
      )
      await sendEmail(emailData)

      // Send faxes
      if (method.faxes) {
        const [uri] = await file.getSignedUrl(24 * 60 * 60 * 1000)
        await Promise.all(method.faxes.map(fax => sendFax(uri, fax)))
      }
    })
  }
}
