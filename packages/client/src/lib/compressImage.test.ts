import { compressedDimensions } from './compressImage'

describe('compressedDimensions', () => {
  test('compress when width is largest', () => {
    expect(compressedDimensions(200, 100, 20)).toEqual({width: 20, height: 10})
  })

  test('compress when height is largest', () => {
    expect(compressedDimensions(100, 200, 20)).toEqual({width: 10, height: 20})
  })

  test('Do not compress when not needed', () => {
    expect(compressedDimensions(100, 200, 1000)).toEqual({width: 100, height: 200})
  })
})
