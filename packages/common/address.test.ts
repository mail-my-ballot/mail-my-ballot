import { uspsAddressTwoLines, uspsAddressOneLine, Address } from './address'
import { sampleAddress } from './testData'

describe('USPS address', () => {
  it('should work without unit', () => {
    expect(uspsAddressTwoLines(sampleAddress)).toStrictEqual(['100 Biscayne Boulevard', 'Miami, Florida 33131'])
    expect(uspsAddressOneLine(sampleAddress)).toStrictEqual('100 Biscayne Boulevard, Miami, Florida 33131')

    const addressWithUnit: Address = {...sampleAddress, unit: '4C'}
    expect(uspsAddressTwoLines(addressWithUnit)).toStrictEqual(['100 Biscayne Boulevard Unit 4C', 'Miami, Florida 33131'])
  })
})
