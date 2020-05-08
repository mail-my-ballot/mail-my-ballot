import { Locale, AvailableState } from "../../common"
import { normalizeLocale } from "./normalize"

const citySuffixes = (suffixes: string[], city: string): string[] => {
  if (suffixes.some(suffix => city.endsWith(suffix))) {
    return [city]
  }
  return [city, ...suffixes.map(suffix => city + suffix)]
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

/** States that have cities independent of counties. These are usually for large cities
 *  So just try matching on cities first and then county if city doesn't match
*/
const keysCityState = (locale: Locale<AvailableState>): string[] => {
  const cityLocales = citySuffixes([' City'], locale.city)
    .map(city => normalizeLocale({...locale, city}))
  const countyLocales = normalizeLocale({...locale, city: ''})
  return cityLocales.concat([countyLocales])
}

/* list of keys to try (in order) */
export const keys = (
  locale: Locale<AvailableState>,
): string[] => {
  switch(locale.state) {
    case 'Florida':
    case 'Georgia':
    case 'Minnesota':
    case 'Nebraska':
    case 'Maine': {
      return [normalizeLocale(locale)]
    }
    case 'Michigan': {
      return citySuffixes([
        ' City',
        ' Township',
        ' Charter Township',
      ], locale.city).map(city => normalizeLocale({...locale, city}))
    }
    case 'Wisconsin': {
      if (!locale.county) return []
      return wisconsinCounties(locale.county).flatMap(county =>
        wisconsinCities(locale.city).map(city =>
          normalizeLocale({...locale, city, county})
        )
      )
    }
    case 'Maryland':
    case 'Virginia':
    case 'Nevada': {
      return keysCityState(locale)
    }
  }
}
