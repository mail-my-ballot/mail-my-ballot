import { Locale, AvailableState } from "../../common"
import { normalizeLocaleKey } from "./normalize"

const citySuffixes = (suffixes: string[], city: string): string[] => {
  if (suffixes.some(suffix => city.endsWith(suffix))) {
    return [city]
  }
  return [city, ...suffixes.map(suffix => city + suffix)]
}

/* add in possible prefixes, assuming larger entities are most likely to have prefix dropped */
const possibleBeginnings = [
  'city of ',
  'town of ',
  'village of ',
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
  const cityLocales = citySuffixes([' city'], locale.city)
    .map(city => normalizeLocaleKey({...locale, city}))
  const countyLocales = normalizeLocaleKey({...locale, city: ''})
  return cityLocales.concat([countyLocales])
}

const michiganCitySuffixes = (city: string): string[] => {
  // Township / Charter Township are relatively interchangable
  if (city.endsWith(' charter township')) {
    return [city, city.replace(' charter township', ' township')]
  } else if (city.endsWith(' township')) {
      return [city, city.replace(' township', ' charter township')]
  } else if (city.endsWith(' city')) { // we sometimes drop the name city
    return [city]
  } else {
    return [city, city + ' city', city + ' township', city + ' charter township']
  }
}

/* list of keys to try (in order) */
export const keys = (
  _locale: Locale<AvailableState>,
): string[] => {
  const locale =  {
    ..._locale,
    city: _locale.city.toLocaleLowerCase(),
    county: _locale.county ? _locale.county.toLocaleLowerCase() : _locale.county,
    otherCities: _locale.otherCities ? _locale.otherCities.map(c => c.toLocaleLowerCase()) : _locale.otherCities,
  }
  switch(locale.state) {
    case 'Arizona':
    case 'Florida':
    case 'Georgia':
    case 'Maine':
    case 'Minnesota':
    case 'Nebraska':
    case 'New York': {
      return [normalizeLocaleKey(locale)]
    }
    case 'Michigan': {
      // In Michigan, first try 'administrative_area_level_3' (otherCities)
      // before 'locality' (city) and vary each them
      const orderedCities = [
        ...(locale?.otherCities ?? []),
        locale.city
      ].flatMap(michiganCitySuffixes)
      return orderedCities.map(city => normalizeLocaleKey({...locale, city}))
    }
    case 'Wisconsin': {
      if (!locale.county) return []
      return wisconsinCounties(locale.county).flatMap(county =>
        wisconsinCities(locale.city).map(city =>
          normalizeLocaleKey({...locale, city, county})
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
