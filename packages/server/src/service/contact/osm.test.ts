import { wait, sampleAddresses, fetchState } from '../../common'

test('Fetch States returning stable results', async () => {
  /*
    Testing geocode is more appropriately with `osm.ts`.  However, it has to be
    here because we want to check that the resulting contact and method objects are not
    null, and this code is (and can only be) available on the server.
  */

  jest.setTimeout(30000)
  await Promise.all(
    sampleAddresses.map(async ([addr, snapName], index) => {
      const parts = addr.split(' ')
      const zip = parts[parts.length - 1]
      const state = snapName.split(', ')[1]
      await wait(index * 400) // test takes 10 seconds to complete, regardless of delay
      console.log(state)
      expect(fetchState(zip)).resolves.toEqual(state)
    })
  )
  jest.setTimeout(5000)
})
