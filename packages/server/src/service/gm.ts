import fetch from 'node-fetch'
import { processEnvOrThrow, Address } from '../common'
import { cache } from './util'

interface GMResults {
  results: google.maps.GeocoderResult[]
  status: google.maps.GeocoderStatus
}

const apiKey = processEnvOrThrow('GOOGLE_MAPS_API_KEY')

const findByType = (
  components: google.maps.GeocoderAddressComponent[],
  type: string
) => components.find(c => c.types.includes(type))?.long_name

const rawGeocode = async (query: string): Promise<google.maps.GeocoderResult | null> => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${apiKey}`
  const response = (await (await fetch(url)).json() as GMResults)
  if (response.status != 'OK') return null
  return response.results[0]
}

const getLatLong = (location: google.maps.LatLng): [number, number] => {
  // Google's API has `.lat()` but you can also call `.lat` directly
  // and that is how the results are serialized (for cached results)
  return [location.lat as unknown as number, location.lng as unknown as number]
}

export const toAddress = (result: google.maps.GeocoderResult): Omit<Address, 'queryAddr'> | null => {
  const components = result.address_components

  const country = findByType(components, 'country')
  const state = findByType(components, 'administrative_area_level_1')
  const postcode = findByType(components, 'postal_code')
  if (!country || !state || !postcode) return null

  const city = (
    findByType(components, 'locality')
    ?? findByType(components, 'sublocality')
  )
  const otherCities = [
    findByType(components, 'administrative_area_level_3'),
    findByType(components, 'administrative_area_level_4'),
    findByType(components, 'administrative_area_level_5'),
  ].filter((c): c is string => !!c)
  
  return {
    latLong: getLatLong(result.geometry.location),
    fullAddr: result.formatted_address,
    city,
    country,
    state,
    postcode,
    county: findByType(components, 'administrative_area_level_2'),
    otherCities: otherCities,
    streetNumber: findByType(components, 'street_number'),
    street: findByType(components, 'route'),
    unit: findByType(components, 'subpremise'),
  }
}

export const cacheGeocode = cache(rawGeocode, async x => x)

export const geocode = async (
  query: string,
  {cacheQuery} = {cacheQuery: false},
): Promise<Address | null> => {
  const func = cacheQuery ? cacheGeocode : rawGeocode
  const result = await func(query)
  if (!result) return null
  const address = toAddress(result)
  if (!address) return null
  return {
    ...address,
    queryAddr: query,
  }
}
