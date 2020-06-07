export interface Address {
  latLong?: [number, number]
  queryAddr: string
  fullAddr: string
  city?: string
  otherCities?: string[]
  county?: string
  postcode: string
  state: string
  country: string
}
