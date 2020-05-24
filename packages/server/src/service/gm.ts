import fetch from 'node-fetch'
import { processEnvOrThrow, Address } from '../common'

interface GMResults {
  results: google.maps.GeocoderResult[]
  status: google.maps.GeocoderStatus
}

const apiKey = processEnvOrThrow('GOOGLE_MAPS_API_KEY')

const findByType = (
  components: google.maps.GeocoderAddressComponent[],
  type: string
) => components.find(c => c.types.includes(type))?.long_name

export const rawGeocode = async (query: string): Promise<google.maps.GeocoderResult | null> => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${apiKey}`
  const response = (await (await fetch(url)).json() as GMResults)
  if (response.status != 'OK') return null
  return response.results[0]
}

export const toAddress = (result: google.maps.GeocoderResult): Omit<Address, 'queryAddr'> | null => {
  const components = result.address_components

  const country = findByType(components, 'country')
  const state = findByType(components, 'administrative_area_level_1')
  const postcode = findByType(components, 'postal_code')
  const county = findByType(components, 'administrative_area_level_2')
  const city = (
    findByType(components, 'locality')
    ?? findByType(components, 'sublocality')
  )
  const fullAddr = result.formatted_address

  if (!country || !state || !postcode) return null

  return {
    fullAddr,
    city,
    country,
    state,
    postcode,
    county,
  }
}

export const geocode = async (query: string): Promise<Address | null> => {
  const result = await rawGeocode(query)
  if (!result) return null
  const address = toAddress(result)
  if (!address) return null
  return {
    ...address,
    queryAddr: query,
  }
}
