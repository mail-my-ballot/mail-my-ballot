import React from 'react'
import 'jest-canvas-mock'
import { render, fireEvent, act, wait } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'
import SignatureCanvas from 'react-signature-canvas'
jest.mock('react-signature-canvas')

import { Michigan } from './Michigan'
import { StateContainer } from '../../App'
import { client } from '../../lib/trpc'
import { mocked } from 'ts-jest/utils'
import { AddressContainer } from '../../lib/state'
import { sampleFloridaAddress } from '../../common/sampleAddresses'
jest.mock('../../lib/trpc')

test('Michigan Form works', async () => {
  const history = createMemoryHistory()

  const { getByLabelText, getByTestId } = render(
    <AddressContainer.Provider initialState={sampleFloridaAddress}>
      <Router history={history}>
        <Michigan
          locale={{
            state: 'Michigan',
            county: 'Wayne County',
            city: 'Canton'
          }}
          contact={{
            state: 'Michigan', 
            city: 'Canton',
            county: 'Wayne County',
            clerk: 'Christina  White',
            email: 'soedade@miamidade.gov',
            fax: '',
            phone: '',
          }}
        />
      </Router>
    </AddressContainer.Provider>,
    { wrapper: StateContainer }
  )

  const register = mocked(client, true).register = jest.fn().mockResolvedValue({
    type: 'data',
    data: 'xxx',
  })

  act(() => {
    fireEvent.change(getByLabelText(/^Full Name/i), {
      target: {
        value: 'Bob Smith'
      },
    })
    fireEvent.change(getByLabelText(/^Birth Year/i), {
      target: {
        value: '1950'
      },
    })
    fireEvent.change(getByLabelText(/^Email/i), {
      target: {
        value: 'bob.smith@gmail.com'
      },
    })
    fireEvent.change(getByLabelText(/^Phone/i), {
      target: {
        value: '123-456-7890'
      },
    })

    // Mock signing
    SignatureCanvas.prototype.isEmpty = jest.fn(() => false)
    SignatureCanvas.prototype.toDataURL = jest.fn(() => 'abcd')

    fireEvent.click(getByTestId('michigan-submit'), {
      bubbles: true,
      cancelable: true,
    })
  })

  await wait(() => expect(history.location.pathname).toBe('/success'))
  await wait(() => expect(register).toHaveBeenCalled())
})
