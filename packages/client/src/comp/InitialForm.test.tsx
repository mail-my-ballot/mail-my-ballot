import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { InitialForm } from './InitialForm'
import { StateContainer } from '../App'
import { osmGeocode } from '../lib/osm'
import { client } from '../lib/trpc'
import { mocked } from 'ts-jest'
jest.mock('../lib/osm')
jest.mock('../lib/trpc')

test('Initial Form is slow', () => {
  const { getByLabelText } = render(
    <InitialForm/>,
    { wrapper: StateContainer }
  )

  mocked(osmGeocode).mockResolvedValue({
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
  })

  mocked(client, true).addLocale = jest.fn().mockResolvedValue({
    type: 'data',
    data: 'xxx',
  })

  const addr = getByLabelText(/^Address/i)
  const unit = getByLabelText(/^Unit/i)

  fireEvent.change(getByLabelText(/^Address/i), {
    target: {value: '100 S Biscayne Blvd, Miami, FL 33131'},
  })
})
