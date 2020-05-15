import React from 'react'
import { render } from '@testing-library/react'
import { Initialize } from './Initialize'
import { UnstatedContainer } from './StateContainer'

test('Initialize picks up utm parameters', () => {
  Object.defineProperty(window, 'location', {
    value: {
      href: 'https://example.com/#/?utm_campaign=campaignid1234'
    }
  })

  render(
    <Initialize/>,
    { wrapper: UnstatedContainer } 
  )

  const userData = localStorage.getItem('user-data')
  expect(userData).toContain('campaignid1234')
})
