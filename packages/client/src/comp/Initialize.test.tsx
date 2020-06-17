import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Initialize } from './Initialize'
import { UnstatedContainer } from './StateContainer'

test('Initialize picks up parameters', () => {
  render(
    // Using MemoryRouter is recommended way to test react-router-dom
    // https://reacttraining.com/react-router/web/guides/testing
    <MemoryRouter initialEntries={['/org/default?utm_campaign=campaignid1234']}>
      <Initialize/>
    </MemoryRouter>,
    { wrapper: UnstatedContainer } 
  )

  const userData = localStorage.getItem('voter-data')
  expect(userData).toContain('campaignid1234')
})
