import { Locale } from "./types"

export const osmGeocode = async (queryAddr: string): Promise<Locale> => {
  const result = await fetch(`https://nominatim.openstreetmap.org/search/${queryAddr}?format=json&countrycodes=us`)
  const json = await result.json()
  const fullAddr: string = json[0].display_name

  // The above returns a long list, like the one below
  // 301, North Olive Avenue, Palm Beach Lakes, West Palm Beach, Palm Beach County, Florida, 33401, United States of America

  const parts = fullAddr.split(',')
  return {
    queryAddr,
    fullAddr,
    country: parts[parts.length - 1].trim(),
    zip: parts[parts.length - 2].trim(),
    state: parts[parts.length - 3].trim(),
    county: parts[parts.length - 4].trim(),
    city: parts[parts.length - 5].trim(),
  }
}
