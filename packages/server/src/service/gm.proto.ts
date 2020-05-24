import { rawGeocode, toAddress } from './gm'
import { cache } from './util'

const main = async() => {
  const geoResult = await cache(rawGeocode)('132 N Royal St Apt #34, Alexandria, VA 22314-3246')
  if (!geoResult) {
    console.log('No Result Returned')
    return
  }
  console.log(JSON.stringify(geoResult, null, 2))
  const address = await toAddress(geoResult)
  console.log(address)
}

main()
