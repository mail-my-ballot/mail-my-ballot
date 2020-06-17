import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Initialize } from './Initialize'
import { UnstatedContainer } from './StateContainer'

test('Initialize picks up parameters', () => {
  const utmFields = {
    utm_source: 'source1234',      //eslint-disable-line @typescript-eslint/camelcase
    utm_medium: 'medium1234',      //eslint-disable-line @typescript-eslint/camelcase
    utm_campaign: 'campaign1234',  //eslint-disable-line @typescript-eslint/camelcase
    utm_term: 'term1234',          //eslint-disable-line @typescript-eslint/camelcase
    utm_content: 'content1234',    //eslint-disable-line @typescript-eslint/camelcase
  }

  const params = Object.entries(utmFields).map(([key, val]) => `${key}=${val}`).join('&')

  render(
    // Using MemoryRouter is recommended way to test react-router-dom
    // https://reacttraining.com/react-router/web/guides/testing
    <MemoryRouter initialEntries={['/org/default?' + params]}>
      <Initialize/>
    </MemoryRouter>,
    { wrapper: UnstatedContainer } 
  )

  const userData = localStorage.getItem('voter-data')
  for (const val of Object.values(utmFields)) {
    expect(userData).toContain(val)
  }
})
