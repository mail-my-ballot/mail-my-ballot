import { MichiganContact } from '../../common'
import rawMichiganData from './MichiganData.json'

// Make toKey take a more general type so it is more broadly usable
type CountyCity = {county: string, city: string}
const toKey = ({county, city}: CountyCity): string => `${county}:${city}`.toLocaleLowerCase()

// Transforms to augment data
type RawContact = Omit<MichiganContact, 'state'>

type ContactCC = {
  contact: RawContact,
  cc: CountyCity
}

const expandSaint = (geo: string): string[] => {
  if (geo.startsWith('St ')) {
    return [geo.replace('St ', 'Saint ')]
  } else if (geo.startsWith('St. ')) { 
    return [geo.replace('St. ', 'Saint ')]
  } else {
    return []
  }
}

const removeCityEnding = (city: string): string => {
  // remove Township or City at end string
  if (city.endsWith(' Charter Township')) {
    return city.replace(' Charter Township', '')
  } else if (city.endsWith(' Township')) {
    return city.replace(' Township', '')
  } else if (city.endsWith(' City')) {
    return city.replace(' City', '')
  } else {
    throw Error(`City ${city} does not hava recognized ending`)
  }
}

type Augmenter = (contact: CountyCity) => CountyCity[]
type ContactAgumenter = (contact: ContactCC) => ContactCC[]
const augment = (augmenter: Augmenter): ContactAgumenter =>
  ({contact, cc}: ContactCC): ContactCC[] => {
    return [{contact, cc}].concat(
      augmenter(cc).map(newCC => ({contact, cc: newCC}))
    )
  }

const augmentCityEnding: ContactAgumenter = augment((cc) => [
  {...cc, city: removeCityEnding(cc.city)}
])

const augmentSaintCity: ContactAgumenter =  augment((cc) =>
  expandSaint(cc.city).map(city => ({...cc, city}))
)

const augmentSaintCounty: ContactAgumenter = augment((cc) =>
  expandSaint(cc.county).map(county => ({...cc, county}))
)

// Load and transform the data
const michiganData: ContactCC[] = (rawMichiganData as RawContact[]).map(
  contact => ({contact, cc: {city:contact.city, county: contact.county}})
)

const reducer = (array: ContactCC[], augmenter: ContactAgumenter): ContactCC[] => {
  return array.flatMap(augmenter)
}

const agumenters = [
  augmentCityEnding,
  augmentSaintCity,
  augmentSaintCounty,
]

// TODO: Dedupe in favor of cities
const michiganTable: Record<string, RawContact> = Object.fromEntries(
  agumenters.reduce(reducer, michiganData).map(({contact, cc}) => [toKey(cc), contact])
)

export const search = (county: string, city: string): MichiganContact | null => {
  const result = michiganTable[toKey({county, city})]
  return result ? {...result, state: 'Michigan'} : null
}
