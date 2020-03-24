import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import App from './App'
import { useAppHistory } from './lib/history'
import { client } from './lib/trpc'
import { mocked } from 'ts-jest/utils'
jest.mock('./lib/history')
jest.mock('./lib/trpc')

describe('App', () => {
  beforeEach(() => {
    mocked(client, true).state = jest.fn().mockResolvedValue({
      type: 'data',
      data: 'Florida',
    })
  })

  it('Renders Initial Blurb', () => {
    const pushAddress = jest.fn()
    mocked(useAppHistory).mockReturnValue({pushAddress} as any)

    const { getByText } = render(<App />)
    const linkElement = getByText(/^Vote by Mail$/i)
    expect(linkElement).toBeInTheDocument()
  })

  it('Scrolls when clicked on Blurb page', () => {
    let calls = 0
    const pushAddress = jest.fn((x, y) => {calls += 1; console.error('f');})
    mocked(useAppHistory).mockReturnValue({pushAddress} as any)

    const { getByTestId } = render(<App />)

    act(() => {
      fireEvent.change(
        getByTestId('start-zip'),
        {
          target: {
            value: '33131'
          },
        }
      )
      fireEvent(
        getByTestId('start-submit'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
    })

    expect(calls).toBeGreaterThanOrEqual(1)
    expect(pushAddress).toHaveBeenCalled()
  })
})
