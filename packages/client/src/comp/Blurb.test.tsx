import React from 'react'
import { Blurb } from './Blurb'
import { UnstatedContainer } from './StateContainer'
import { render } from '@testing-library/react'

test('BlurbForm works', async() => {
  const { getByText } = render(
    <Blurb/>,
    { wrapper: UnstatedContainer }
  )

  const linkElement = getByText(/^MailMyBallot streamlines state vote-by-mail applications by digitizing the voter’s signup process\.$/i)
  expect(linkElement).toBeInTheDocument()
})
