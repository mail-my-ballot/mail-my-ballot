import { osmGeocode } from './osm'

test('OSM is returning stable results', async () => {
  const testCases: [string, string][] = [
    ['100 S Biscayne Blvd, Miami, FL 33131', 'Miami-Dade County, Florida'],
    ['5443 Main St, Port Richey, FL 34652', 'Pasco County, Florida'],
    ['2000 W Commercial Blvd, Fort Lauderdale, FL 33309', 'Broward County, Florida'],
    ['45525 Hanford Rd, Canton, MI 48187', 'Wayne County, Michigan'],
    ['24624 W Warren St, Dearborn Heights, MI', 'Wayne County, Michigan'],
    ['22100 Michigan Ave. Dearborn, MI 48124', 'Wayne County, Michigan'],
    ['700 Broad Street St Joseph, MI 49085', ' Berrien County, Michigan'],
    ['2724 Peck St, Muskegon Heights, MI 49444', 'Muskegon County, Michigan'],
  ]

  try {
    await Promise.all(
      testCases.map(async (pair) => {
        const [addr, county] = pair
        const result = await osmGeocode(addr, '1A')
        expect(result).toMatchSnapshot(county)
      })
    )
  } catch(e) {
    fail()
  }
})
