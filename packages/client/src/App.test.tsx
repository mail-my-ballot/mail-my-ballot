import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('Renders Initial Blurb', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/^Vote by Mail$/i)
  expect(linkElement).toBeInTheDocument()
})
