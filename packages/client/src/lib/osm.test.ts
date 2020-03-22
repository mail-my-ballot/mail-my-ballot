import { geocode } from './osm'
import { sampleAddresses } from '../common/sampleAddresses'

test('Snapshot names are unique', () => {
  const snapNames = sampleAddresses.map((_, snapName) => snapName)
  expect(snapNames).toHaveLength((new Set(snapNames)).size)
})

test('OSM is returning stable results', async () => {
  try {
    await Promise.all(
      sampleAddresses.map(async (pair) => {
        const [addr, snapName] = pair
        const result = await geocode(addr, '1A')
        expect(result).toMatchSnapshot(snapName)
      })
    )
  } catch(e) {
    fail()
  }
})
