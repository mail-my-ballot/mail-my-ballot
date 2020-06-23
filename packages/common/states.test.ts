import { isState, getState } from './states'

test('isState should return true for valid state', () => {
    const state = 'Florida'
    expect(isState(state)).toBe(true)
})

test('isState should return false for invalid state', () => {
  const state = 'Blorida'
  expect(isState(state)).toBe(false)
})

test('getState should return state for found state case insensitively', () => {
  const state = 'florida'
  expect(getState(state)).toBe('Florida')
})

test('getState should return state for found state abbreviation', () => {
  const state = 'FL'
  expect(getState(state)).toBe('Florida')
})

test('getState should return null for unidentified state', () => {
  const state = 'abc'
  expect(getState(state)).toBeUndefined()
})
