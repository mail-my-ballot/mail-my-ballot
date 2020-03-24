import React from 'react'
import { render, fireEvent, waitForElement, act } from '@testing-library/react'
import { AddressForm } from './AddressForm'
import { StateContainer } from '../App'
import { geocode } from '../lib/osm'
import { client } from '../lib/trpc'
import { mocked } from 'ts-jest/utils'
import { sampleAddress } from '../common/sampleAddresses'
jest.mock('../lib/osm')
jest.mock('../lib/trpc')

test('AddressForm works', async () => {
  const { getByLabelText, getByTestId } = render(
    <AddressForm/>,
    { wrapper: StateContainer }
  )

  const mockedOsmGeocode = mocked(geocode)
  mockedOsmGeocode.mockResolvedValue(sampleAddress)

  const addAddress = mocked(client, true).addAddress = jest.fn().mockResolvedValue({
    type: 'data',
    data: 'xxx',
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
  expect(addAddress).toHaveBeenCalled()
  expect(getByTestId('status-title')).toHaveTextContent('Great News!')
  expect(getByTestId('status-detail')).toHaveTextContent(sampleAddress.state)
  expect(getByTestId('status-detail')).toHaveTextContent(sampleAddress.county)
})
