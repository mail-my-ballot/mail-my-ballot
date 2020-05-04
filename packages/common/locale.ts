import { State, isState } from './states'
import { Address} from './address'

export interface Locale<S extends State = State> {
  city: string
  county: string
  state: S
}

export const toLocale = (address: Address): Locale | null => {
  const { state, city, county } = address
  if (!isState(state) || !city || !county) return null
  return { state, city, county }
}
