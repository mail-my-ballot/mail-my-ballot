import { cacheGeocode, toAddress } from './gm'
import { toContact } from './contact'
import { Locale, toContactMethod } from '../common'

const main = async() => {
  const geoResult = await cacheGeocode('954 Baldwin St, Traverse City, MI 49686')
  if (!geoResult) return 
  
  console.log(JSON.stringify(geoResult, null, 2))
  const address = await toAddress(geoResult)
  console.log('##### Address')
  console.log(address)

  if (!address) return
  const contact = await toContact(address as Locale)
  console.log('##### Contact')
  console.log(contact)

  if (!contact) return
  const method = await toContactMethod(contact)
  console.log('##### Method')
  console.log(method)
}

main()
