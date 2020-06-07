import { State, isState } from './states'
import { Address } from './address'

export interface Locale<S extends State = State> {
  latLong: [number, number]
  otherCities?: string[]
  city: string
  county?: string
  state: S
}

export const toLocale = (address: Address): Locale | null => {
  const { state, county, city, otherCities, latLong } = address
  if (!isState(state) || !city) return null
  return { state, county, city, otherCities, latLong }
}
