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

describe('OSM is returning stable results', () => {
  /*
    Testing geocode is more appropriately with `osm.ts`.  However, it has to be
    here because we want to check that the resulting contact and method objects are not
    null, and this code is (and can only be) available on the server.
  */

  it('Should geocode all data', async () => {
    await Promise.all(
      sampleAddresses.map(async (addrData, index) => {
        await wait(index * 0) // space calls out if we're running for firs time
        const result = await cache(geocode)(addrData.address)
        expect(result).toBeTruthy()
        return result as Address
      })
    )
  })

  const table = sampleAddresses.map(
    addr => [addr.address, addr.state, addr.county, addr.city]
  )

  test.each(table)(
    'Checking %s',
    async (address, state, county, city) => {
      const result = await cache(geocode)(address)
      expect(result).toBeTruthy()
      const locale = toLocale(result as Address)
      expect(locale).toBeTruthy()
      expect(locale).toEqual({state, county, city})
      expect(isAvailableState((locale as Locale).state)).toBeTruthy()
      const contact = await toContact(locale as Locale<AvailableState>)
      expect(contact).toBeTruthy()
      const method = toContactMethod(contact)
      expect(method).toBeTruthy()
    }
  )
})
