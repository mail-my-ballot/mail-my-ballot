import React from 'react'
import { render, fireEvent, waitForElement, act } from '@testing-library/react'
import { RawAddressForm } from './AddressForm'
import { StateContainer } from "./StateContainer"
import { client } from '../lib/trpc'
import { pageView } from '../lib/analytics'
import { mocked } from 'ts-jest/utils'

jest.mock('../lib/analytics')
jest.mock('../lib/trpc')

test('AddressForm works', async () => {
  const mockedPageView = mocked(pageView)

  const fetchContactAddress = mocked(client, true).fetchContactAddress = jest.fn().mockResolvedValue({
    type: 'data',
    data: {
      contact: null,
      address: null,
    },
  })

  const { getByLabelText, getByTestId } = render(
    <RawAddressForm state='Florida'/>,
    { wrapper: StateContainer }
  )

  act(() => {
    fireEvent.change(getByLabelText(/^Address/i), {
      target: {
        value: '100 S Biscayne Blvd, Miami, FL 33131'
      },
    })
    fireEvent.click(getByTestId('submit'), {
        bubbles: true,
        cancelable: true,
    })
  })

  await waitForElement(() => getByTestId('status-title'))

  expect(fetchContactAddress).toHaveBeenCalledTimes(1)
  expect(mockedPageView).toHaveBeenCalledTimes(1)
  expect(getByTestId('status-title')).toHaveTextContent('Great News!')
  expect(getByTestId('status-detail')).toHaveTextContent('Florida')
})
