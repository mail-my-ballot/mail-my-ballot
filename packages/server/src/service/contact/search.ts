import { Locale, AvailableState } from "../../common"
import { normalizeKey } from "./normalize"

/* remove Township or City at end string */
const possibleEndings = [
  ' City',
  ' Township',
  ' Charter Township',
]
const michiganCities = (city: string): string[] => {
  if (possibleEndings.some(ending => city.endsWith(ending))) {
    return [city]
  }
  return [city, ...possibleEndings.map(ending => city + ending)]
}

/* add in possible prefixes, assuming larger entities are most likely to have prefix dropped */
const possibleBeginnings = [
  'City of ',
  'Town of ',
  'Village of ',
]
const wisconsinCities = (city: string): string[] => {
  if (possibleBeginnings.some(beginning => city.startsWith(beginning))) {
    return [city]
  }
  return [city, ...possibleBeginnings.map(beginning => beginning + city)]
}
/* cities that span multiple counties are listed without a county */
const wisconsinCounties = (county: string): string[] => {
  return [county, '']
}

/* list of keys to try (in order) */
export const keys = (
  locale: Locale<AvailableState>,
): string[] => {
  switch(locale.state) {
    case 'Florida':
    case 'Georgia':
    case 'Maryland':
    case 'Minnesota':
    case 'Nebraska':
    case 'Virginia':
    case 'Maine': {
      return [normalizeKey(locale)]
    }
    case 'Michigan': {
      return michiganCities(locale.city).map(city => normalizeKey({...locale, city}))
    }
    case 'Wisconsin': {
      return wisconsinCounties(locale.county).flatMap(county =>
        wisconsinCities(locale.city).map(city =>
          normalizeKey({...locale, city, county})
        )
      )
    }
    case 'Nevada': {
      if (locale.city === 'Carson City') {
        return [normalizeKey({...locale, county: undefined})]
      } else {
        return [normalizeKey({...locale, city: undefined})]
      }
    }
  }
}
