import { geocode, Address, sampleAddresses, toLocale, toContactMethod, AvailableState, isAvailableState, Locale } from '../../common'
import { toContact } from '.'

test('Snapshot names are unique', () => {
  const snapNames = sampleAddresses.map((_, snapName) => snapName)
  expect(snapNames).toHaveLength((new Set(snapNames)).size)
})

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

test('OSM is returning stable results', async (cb) => {
  /*
    Testing geocode is more appropriately with `osm.ts`.  However, it has to be
    here because we want to check that the resulting contact and method objects are not
    null, and this code is (and can only be) available on the server.
  */

  jest.setTimeout(30000)
  const results = await Promise.all(
    sampleAddresses.map(async ([addr, snapName], index) => {
      await wait(index * 200) // test takes 10 seconds to complete, regardless of delay
      const result = await geocode(addr, '1A')
      expect(result).toMatchSnapshot(snapName)
      expect(result).toBeTruthy()
      return result as Address
    })
  )

  jest.setTimeout(5000)

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
