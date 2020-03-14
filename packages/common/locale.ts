import { State } from './states'

export interface Locale<S extends State = State> {
  city: string
  county: string
  state: S
}
