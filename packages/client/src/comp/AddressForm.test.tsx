import React from 'react'
import { render, fireEvent, waitForElement, act } from '@testing-library/react'
import { RawAddressForm } from './AddressForm'
import { StateContainer } from "../StateContainer"
import { geocode } from '../lib/osm'
import { client } from '../lib/trpc'
import { mocked } from 'ts-jest/utils'
import { sampleAddress } from '../common/sampleAddresses'
jest.mock('../lib/osm')
jest.mock('../lib/trpc')

test('AddressForm works', async () => {
  const { getByLabelText, getByTestId } = render(
    <RawAddressForm state='Florida'/>,
    { wrapper: StateContainer }
  )

  const mockedOsmGeocode = mocked(geocode)
  mockedOsmGeocode.mockResolvedValue(sampleAddress)

  const fetchContact = mocked(client, true).fetchContact = jest.fn().mockResolvedValue({
    type: 'data',
    data: null,
  })

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

  expect(mockedOsmGeocode).toHaveBeenCalled()
  expect(fetchContact).toHaveBeenCalled()
  expect(getByTestId('status-title')).toHaveTextContent('Great News!')
  expect(getByTestId('status-detail')).toHaveTextContent(sampleAddress.state)
})
