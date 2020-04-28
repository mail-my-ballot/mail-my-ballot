import { geocode } from './osm'
import { sampleAddresses } from '../common/sampleAddresses'

test('Snapshot names are unique', () => {
  const snapNames = sampleAddresses.map((_, snapName) => snapName)
  expect(snapNames).toHaveLength((new Set(snapNames)).size)
})

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

test.skip('OSM is returning stable results', async () => {
  await Promise.all(
    sampleAddresses.map(async ([addr, snapName], key) => {
      await wait(key * 1100)
      const result = await geocode(addr, '1A')
      expect(result).toMatchSnapshot(snapName)
    })
  )
})
