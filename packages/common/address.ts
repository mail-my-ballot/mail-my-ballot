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

  // Street address components
  streetNumber?: string  // e.g. 1600
  street?: string        // e.g. Amphitheatre Pkwy
  unit?: string          // e.g. Apt 3C
}
