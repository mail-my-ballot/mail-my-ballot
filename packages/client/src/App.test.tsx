import React from 'react'
import { render, fireEvent, act, wait } from '@testing-library/react'
import App from './App'
import { useAppHistory } from './lib/path'
import { client } from './lib/trpc'
import { pageView } from './lib/analytics'
import { mocked } from 'ts-jest/utils'
jest.mock('./lib/path')
jest.mock('./lib/analytics')
jest.mock('./lib/trpc')

describe('App', () => {
  beforeAll(() => {
    mocked(client, true).fetchState = jest.fn().mockResolvedValue({
      type: 'data',
      data: 'Florida',
    })
    mocked(client, true).fetchAnalytics = jest.fn().mockResolvedValue({})
    mocked(client, true).fetchFeatureFlags = jest.fn().mockResolvedValue({})
  })

  it('Scrolls when clicked on Blurb page', () => {
    const pushAddress = jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const returnValue = { pushAddress, query: {utmCampaign: '2'}} as any
    mocked(useAppHistory).mockReturnValue(returnValue)

    const mockedPageView = mocked(pageView)

    const { getAllByTestId } = render(<App />)

    act(() => {
      fireEvent.change(
        getAllByTestId('start-zip')[0],
        {
          target: {
            value: '33131'
          },
        }
      )
      fireEvent(
        getAllByTestId('start-submit')[0],
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
    })

    wait(() => expect(pushAddress).toHaveBeenCalledTimes(1))
    wait(() => expect(mockedPageView).toHaveBeenCalledTimes(1))
  })
})
