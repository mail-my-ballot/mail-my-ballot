import React from 'react'
import { render, fireEvent, act, wait } from '@testing-library/react'
import App from './App'
import { useAppHistory } from './lib/history'
import { client } from './lib/trpc'
import { mocked } from 'ts-jest/utils'
jest.mock('./lib/history')
jest.mock('./lib/trpc')

describe('App', () => {
  beforeAll(() => {
    mocked(client, true).state = jest.fn().mockResolvedValue({
      type: 'data',
      data: 'Florida',
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mocked(useAppHistory).mockReturnValue({pushAddress: jest.fn()} as any)
  })

  it('Renders Initial Blurb', () => {
    const { getByText } = render(<App />)
    const linkElement = getByText(/^Vote by Mail$/i)
    expect(linkElement).toBeInTheDocument()
  })

  it('Scrolls when clicked on Blurb page', () => {
    const pushAddress = jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    wait(() => expect(pushAddress).toHaveBeenCalled())
  })
})
