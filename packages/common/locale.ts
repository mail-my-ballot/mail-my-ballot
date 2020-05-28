import { State, isState } from './states'
import { Address} from './address'

export interface Locale<S extends State = State> {
  otherCities?: string[]
  city: string
  county?: string
  state: S
}

export const toLocale = (address: Address): Locale | null => {
  const { state, county, city, otherCities } = address
  if (!isState(state) || !city) return null
  return { state, county, city, otherCities }
}
