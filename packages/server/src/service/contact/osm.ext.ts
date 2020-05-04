import { wait, sampleAddresses, fetchState } from '../../common'

test('Fetch States returning stable results', async (cb) => {
  /*
    Testing geocode is more appropriately with `osm.ts`.  However, it has to be
    here because we want to check that the resulting contact and method objects are not
    null, and this code is (and can only be) available on the server.
  */

  await Promise.all(
    sampleAddresses.map(async ([addr, snapName], index) => {
      const addrParts = addr.split(' ')
      const zip = addrParts[addrParts.length - 1]
      
      const nameParts = snapName.split(', ')
      const state = nameParts[nameParts.length - 1]
      await wait(index * 300) // test takes 10 seconds to complete, regardless of delay
      expect(await fetchState(zip)).toEqual(state)
    })
  )
  cb()
})
