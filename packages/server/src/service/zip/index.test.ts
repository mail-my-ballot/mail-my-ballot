import { search } from './index'
import { wait } from '@testing-library/react'

test('zipcode search works', () => {
  wait(() => expect(search('48043')).toBe('Michigan'))
})
