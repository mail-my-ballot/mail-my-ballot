// This should really be in common but common doesn't support testing

import { isState, getState } from '../common'

describe('isState', () => {
  test('returns true for valid state', () => {
      const state = 'Florida'
      expect(isState(state)).toBe(true)
  })

  test('returns false for invalid state', () => {
    const state = 'Blorida'
    expect(isState(state)).toBe(false)
  })

  test('returns false for mismatched case', () => {
    const state = 'florida'
    expect(isState(state)).toBe(false)
  })
})

describe('getState', () => {
  test('returns state for found state case insensitively', () => {
    const state = 'florida'
    expect(getState(state)).toBe('Florida')
  })
  
  test('returns state for found state abbreviation', () => {
    const state = 'fl'
    expect(getState(state)).toBe('Florida')
  })
  
  test('returns undefined for unidentified state', () => {
    const state = 'abc'
    expect(getState(state)).toBeUndefined()
  })
})
