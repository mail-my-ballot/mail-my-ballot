export interface Address {
  queryAddr: string
  fullAddr: string
  houseNumber: string
  road: string
  unit: string
  city: string
  state: string
  postcode: string
  country: string
  county: string
}

export const uspsAddressTwoLines = (
  {
    houseNumber,
    road,
    unit,
    city,
    state,
    postcode
  }: Address
): [string, string] => {
  return [
    `${houseNumber} ${road}` + (unit ? ` Unit ${unit}` : ''),
    `${city}, ${state} ${postcode}`
  ]
}

export const uspsAddressOneLine = (address: Address): string => {
  const [x, y] = uspsAddressTwoLines(address)
  return x + ', ' + y
}
