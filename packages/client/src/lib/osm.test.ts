import { geocode } from './osm'
import { sampleAddresses } from '../common/sampleAddresses'

test('Snapshot names are unique', () => {
  const snapNames = sampleAddresses.map((_, snapName) => snapName)
  expect(snapNames).toHaveLength((new Set(snapNames)).size)
})

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

test('OSM is returning stable results', async (cb) => {
  jest.setTimeout(30000)
  await Promise.all(
    sampleAddresses.map(async ([addr, snapName], index) => {
      await wait(index * 250)
      const result = await geocode(addr, '1A')
      expect(result).toMatchSnapshot(snapName)
    })
  )
  jest.setTimeout(5000)
  cb()
})
