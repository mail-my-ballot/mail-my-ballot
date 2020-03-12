import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('Renders Initial Blurb', () => {
    const { getByText } = render(<App />)
    const linkElement = getByText(/^Vote by Mail$/i)
    expect(linkElement).toBeInTheDocument()
  })

  it('Scrolls when clicked on Blurb page', () => {
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
})
