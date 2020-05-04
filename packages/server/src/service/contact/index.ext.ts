import { Address, sampleAddresses, toLocale, toContactMethod, AvailableState, isAvailableState, Locale, wait } from '../../common'
import { toContact } from '.'
import { geocode } from '../gm'
import fs from 'fs'

const encoding = 'utf8'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func<T extends Record<string, any>> = (_: string) => Promise<T>
const cache = <T>(f: Func<T>): Func<T> => {
  return async (arg: string) => {
    const path = `${__dirname}/cache/${arg}.json`
    if (fs.existsSync(path)) {
      const data = fs.readFileSync(path, { encoding } )
      return JSON.parse(data)
    } else {
      const ret = await f(arg)
      const data = JSON.stringify(ret)
      fs.writeFileSync(path, data, { encoding })
    }
  }
}

test('OSM is returning stable results', async (cb) => {
  /*
    Testing geocode is more appropriately with `osm.ts`.  However, it has to be
    here because we want to check that the resulting contact and method objects are not
    null, and this code is (and can only be) available on the server.
  */

  const results = await Promise.all(
    sampleAddresses.map(async (addrData, index) => {
      await wait(index * 0) // space calls out if we're running for firs time
      const result = await cache(geocode)(addrData.address)
      expect(result).toBeTruthy()
      return result as Address
    })
  )

  results.forEach(async (result) => {
    const locale = toLocale(result)
    expect(locale).toBeTruthy()
    expect(isAvailableState((locale as Locale).state)).toBeTruthy()
    const contact = await toContact(locale as Locale<AvailableState>)
    expect(contact).toBeTruthy()
    const method = toContactMethod(contact)
    expect(method).toBeTruthy()
  })

  cb()
})
