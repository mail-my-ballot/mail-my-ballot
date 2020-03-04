import { WithoutId, Locale } from "../common"

const getJson = async <T>(url: string): Promise<T> => {
  const result = await fetch(url)
  return await result.json()
}

export const osmGeocode = async (queryAddr: string): Promise<WithoutId<Locale> | null> => {
  const obj = (await getJson<Array<any>>(`https://nominatim.openstreetmap.org/search/${queryAddr}?format=json&countrycodes=us`))[0]
  if (!obj) {
    return null
  }
  const osmId = obj.osm_type[0].toUpperCase() + obj.osm_id
  const detail = (await getJson<Array<any>>(`https://nominatim.openstreetmap.org/lookup?osm_ids=${osmId}&format=json`))[0]
  if (!detail) {
    return null
  }
  const { address } = detail
  const { country, state, postcode, county, city } = address

  return {
    queryAddr,
    fullAddr: obj.display_name,
    country,
    zip: postcode,
    state,
    county,
    city,
  }
}
