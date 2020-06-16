import React from 'react'
import { render } from '@testing-library/react'
import { Initialize } from './Initialize'
import { UnstatedContainer } from './StateContainer'

test('Initialize picks up parameters', () => {
  Object.defineProperty(window, 'location', {
    value: {
      href: 'https://example.com'
    }
  })

  render(
    <Initialize/>,
    { wrapper: UnstatedContainer } 
  )

  const userData = localStorage.getItem('voter-data')
  expect(userData).toContain('uid')
})
