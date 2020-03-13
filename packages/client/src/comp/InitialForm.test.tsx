import React from 'react'
import { render, fireEvent, waitForElement, act } from '@testing-library/react'
import { InitialForm } from './InitialForm'
import { StateContainer } from '../App'
import { osmGeocode } from '../lib/osm'
import { client } from '../lib/trpc'
import { mocked } from 'ts-jest/utils'
jest.mock('../lib/osm')
jest.mock('../lib/trpc')

test('InitialForm works', async () => {
  const { getByLabelText, getByTestId } = render(
    <InitialForm/>,
    { wrapper: StateContainer }
  )

  const mockedOsmGeocode = mocked(osmGeocode)
  const osmData = {
    'city': 'Miami',
    'country': 'United States of America',
    'county': 'Miami-Dade County',
    'fullAddr': '100, Biscayne Boulevard, The Roads, Miami, Miami-Dade County, Florida, 33131, United States of America',
    'houseNumber': '100',
    'postcode': '33131',
    'queryAddr': '100 S Biscayne Blvd, Miami, FL 33131',
    'road': 'Biscayne Boulevard',
    'state': 'Florida',
    'unit': '1A',
  }
  mockedOsmGeocode.mockResolvedValue(osmData)

  const addLocale = mocked(client, true).addLocale = jest.fn().mockResolvedValue({
    type: 'data',
    data: 'xxx',
  })

  act(() => {
    fireEvent.change(getByLabelText(/^Address/i), {
      target: {
        value: '100 S Biscayne Blvd, Miami, FL 33131'
      },
    })
    fireEvent.click(getByTestId('initialform-submit'), {
        bubbles: true,
        cancelable: true,
    })
  })

  await waitForElement(() => getByTestId('status-title'))

  expect(mockedOsmGeocode).toHaveBeenCalled()
  expect(addLocale).toHaveBeenCalled()
  expect(getByTestId('status-title')).toHaveTextContent('Great News!')
  expect(getByTestId('status-detail')).toHaveTextContent(osmData.state)
  expect(getByTestId('status-detail')).toHaveTextContent(osmData.county)
})
