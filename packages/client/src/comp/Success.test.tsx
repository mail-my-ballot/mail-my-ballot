import React from 'react'
import { render } from '@testing-library/react'
import { Success } from './Success'
import { MemoryRouter } from 'react-router-dom'

test('Success page renders', () => {
  const { getByText } = render(
    <Success/>, {
    wrapper: MemoryRouter
  })
  const h1 = getByText(/^Success!$/i)
  expect(h1).toBeInTheDocument()
})
