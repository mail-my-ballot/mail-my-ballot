import { rawGeocode, toAddress } from './gm'
import { cache } from './util'
import { toContact } from './contact'
import { Locale, toContactMethod } from '../common'

const main = async() => {
  const geoResult = await cache(rawGeocode)('3600 Telegraph Rd, Bloomfield Twp, MI 48302')
  if (!geoResult) return 
  
  console.log(JSON.stringify(geoResult, null, 2))
  const address = await toAddress(geoResult)
  console.log(address)

  if (!address) return
  const contact = await toContact(address as Locale)
  console.log(contact)

  if (!contact) return
  const method = await toContactMethod(contact)
  console.log(method)
}

main()
