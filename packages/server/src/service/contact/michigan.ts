import { MichiganContact } from '../../common'
import rawMichiganData from './MichiganData.json'

type SimpleContact = Omit<MichiganContact, 'state'>

const michiganData = rawMichiganData as SimpleContact[]

const removeCityEnding = (city: string): string => {
  // remove Township or City at end string
  if (city.endsWith(' Township')) {
    return city.replace(' Township', '')
  } else if (city.endsWith(' City')) {
    return city.replace(' City', '')
  } else {
    throw Error(`City ${city} does not hava recognized ending`)
  }
}

const noEndings = michiganData.map(
  (c): [string, SimpleContact] => 
    [`${c.county}:${removeCityEnding(c.city)}`.toLocaleLowerCase(), c]
)
const withEndings = michiganData.map(
  (c): [string, SimpleContact] =>
    [`${c.county}:${c.city}`.toLocaleLowerCase(), c]
)

const michiganTable = Object.fromEntries(
  noEndings.concat(withEndings)
)

export const search = (county: string, city: string): MichiganContact | null => {
  console.log(county, city)
  const result = michiganTable[`${county}:${city}`.toLowerCase()]
  if (!result) return null
  return {
    state: 'Michigan',
    ...result
  }
}
