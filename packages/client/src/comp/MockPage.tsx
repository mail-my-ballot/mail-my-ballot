import React from 'react'
import { AddressContainer } from '../lib/unstated'
import { Address, ImplementedState } from '../common'
import { StatePanel } from './states/StateForm'
import { StateSelector, StateContainer } from './StateSelector'

const sampleAddress: Address & { city: string, state: ImplementedState } = {
  queryAddr: '100 S Biscayne Blvd, Miami, FL 33131, USA',
  fullAddr: '100 S Biscayne Blvd, Miami, FL 33131, USA',
  city: 'Miami',
  country: 'United States',
  state: 'Florida',
  postcode: '33131',
  county: 'Miami-Dade County'
}

const RawMockPage: React.FC<{}> = () => {
  const { state } = StateContainer.useContainer()
  const address = {...sampleAddress, state}

  return <AddressContainer.Provider initialState={address}>
    <h1>Sample {state} Form</h1>
    <p><b>Fill out</b> the following form</p>
    <StatePanel locale={address}/>
  </AddressContainer.Provider>
}

export const MockPage: React.FC<{}> = () => {
  if (!process.env.REACT_APP_MOCK) return null

  return <StateSelector>
    <RawMockPage/>
  </StateSelector>
}
