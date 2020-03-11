import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from './App'

test('Renders Initial Blurb', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/^Vote by Mail$/i)
  expect(linkElement).toBeInTheDocument()
})

test('Click on Blurb page works', () => {
  const { getByTestId } = render(<App />)

  // Suggested by https://stackoverflow.com/a/53294906/8930600
  window.HTMLElement.prototype.scrollIntoView = jest.fn()

  fireEvent(
    getByTestId('start'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )

  expect(getByTestId('app').scrollIntoView).toHaveBeenCalled()
})
