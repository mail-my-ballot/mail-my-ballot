import React from 'react'
import { render, fireEvent, act, wait } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'

import { Florida } from './Florida'
import { StateContainer } from "../StateContainer"
import { client } from '../../lib/trpc'
import { mocked } from 'ts-jest/utils'
import { sampleAddress } from '../../common/sampleAddresses'
import { toPath, SuccessPath } from '../../lib/path'
jest.mock('../../lib/trpc')

test('Florida Form works', async () => {
  const history = createMemoryHistory()

  const { getByLabelText, getByTestId } = render(
    <Router history={history}>
      <Florida
        locale={{
          state: 'Florida',
          county: 'Miami-Dade County',
          city: 'Miami'
        }}
        address={sampleAddress}
        contact={{
          state: 'Florida', 
          county: 'Miami-Dade County',
          clerk: 'Christina  White',
          email: 'soedade@miamidade.gov',
          url: 'http://www.miamidade.gov/elections/',
        }}
      />
    </Router>,
    { wrapper: StateContainer }
  )

  const register = mocked(client, true).register = jest.fn().mockResolvedValue({
    type: 'data',
    data: 'confirmationId',
  })
  window.scrollTo = jest.fn()

  act(() => {
    fireEvent.change(getByLabelText(/^Full Name/i), {
      target: {
        value: 'Bob Smith'
      },
    })
    fireEvent.change(getByLabelText(/^Birthdate/i), {
      target: {
        value: '01/01/1900'
      },
    })
    fireEvent.change(getByLabelText(/^Email/i), {
      target: {
        value: 'bob.smith@gmail.com'
      },
    })
    fireEvent.click(getByTestId('florida-submit'), {
        bubbles: true,
        cancelable: true,
    })
  })

  await wait(() => expect(toPath(history.location.pathname)).toEqual<SuccessPath>(
    {id: "confirmationId", oid: "default", type: "success"}
  ))
  await wait(() => expect(register).toHaveBeenCalled())
})
