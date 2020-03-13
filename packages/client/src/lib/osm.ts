import { WithoutId, Address } from "../common"

const getJson = async <T>(url: string): Promise<T> => {
  const result = await fetch(url)
  return await result.json()
}

export const osmGeocode = async (queryAddr: string, unit: string): Promise<WithoutId<Address> | null> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj = (await getJson<Array<any>>(`https://nominatim.openstreetmap.org/search/${queryAddr}?format=json&countrycodes=us`))[0]
  if (!obj) {
    return null
  }
  const osmId = obj.osm_type[0].toUpperCase() + obj.osm_id

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
  const fullAddr = obj.display_name
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
