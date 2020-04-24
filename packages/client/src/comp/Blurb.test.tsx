import React from 'react'
import { Blurb } from './Blurb'
import { StateContainer } from './StateContainer'
import { Analytics } from '../comp/Analytics'
import { render } from '@testing-library/react'

test('BlurbForm works', async() => {
  const { getByText } = render(
    <>
      <Analytics/>
      <Blurb/>
    </>,
    { wrapper: StateContainer }
  )

  const linkElement = getByText(/^Vote by Mail$/i)
  expect(linkElement).toBeInTheDocument()
})