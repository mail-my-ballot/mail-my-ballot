import { Address } from "../common"

const getJson = async <T>(url: string): Promise<T> => {
  const result = await fetch(url)
  return await result.json()
}

interface BasicAddress {
  houseNumber: string
  road: string
  unit: string
  city: string
  country: string
  state: string
  postcode: string
  county: string
}

const parseDisplayName = (displayName: string, unit: string): BasicAddress | null => {
  /*
  Parse a display_name field from osm sumary result, e.g.
  2125, Butterfield Road, Regents Club Of Troy, Big Beaver, Troy, Oakland County, Michigan, 48084, United States of America
  */

  // 
  const parts = displayName.split(',')
  if(parts.length < 7) return null
  return {
    houseNumber: parts[0].trim(),
    road: parts[1].trim(),
    unit,
    city: parts[parts.length - 5].trim(),
    county: parts[parts.length - 4].trim(),
    state: parts[parts.length - 3].trim(),
    postcode: parts[parts.length - 2].trim(),
    country: parts[parts.length - 1].trim(),
  }
}

export const geocode = async (queryAddr: string, unit: string): Promise<Address | null> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const summary = (await getJson<Array<any>>(`https://nominatim.openstreetmap.org/search/${queryAddr}?format=json&countrycodes=us`))[0]
  if (!summary) {
    return null
  }
  const osmId = summary.osm_type[0].toUpperCase() + summary.osm_id
  const summaryAddress = parseDisplayName(summary.display_name, unit)
  if (summaryAddress) {
    return {
      queryAddr,
      fullAddr: summary.display_name,
      ...summaryAddress
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const detail = (await getJson<Array<any>>(`https://nominatim.openstreetmap.org/lookup?osm_ids=${osmId}&format=json`))[0]
  if (!detail) {
    return null
  }
  const { address } = detail
  const {
    house_number: rawHouseNumber,
    road,
    city,
    state,
    postcode,
    country,
    county
  } = address

  // OSM is often missing the house number on response.  So we'll infer it
  const fullAddr = summary.display_name
  const houseNumber = rawHouseNumber ? rawHouseNumber : fullAddr.split(',')[0].trim()

  return {
    queryAddr,
    fullAddr,
    houseNumber,
    road,
    unit,
    city,
    state,
    postcode,
    country,
    county,
  }
}
