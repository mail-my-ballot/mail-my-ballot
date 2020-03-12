import { uspsAddressTwoLines, uspsAddressOneLine, Address } from './address'

describe('USPS address', () => {

  it('should work without unit', () => {
    const addr: Address = {
      queryAddr: '',
      fullAddr: '',
      houseNumber: '11',
      road: 'Wall St',
      unit: '',
      city: 'New York',
      state: 'New York',
      postcode: '10005',
      country: '',
      county: '',
    }

    expect(uspsAddressTwoLines(addr)).toStrictEqual(['11 Wall St', 'New York, New York 10005'])
    expect(uspsAddressOneLine(addr)).toStrictEqual('11 Wall St, New York, New York 10005')

    const addrWithUnit: Address = {...addr, unit: '4C'}
    expect(uspsAddressTwoLines(addrWithUnit)).toStrictEqual(['11 Wall St Unit 4C', 'New York, New York 10005'])
  })

})

