import React from 'react'
import 'jest-canvas-mock'
import { render, fireEvent, act, wait } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'
jest.mock('react-signature-canvas')

import { Wisconsin } from './Wisconsin'
import { StateContainer } from "../StateContainer"
import { client } from '../../lib/trpc'
import { mocked } from 'ts-jest/utils'
import { sampleAddress } from '../../common/sampleAddresses'
import { toPath, SuccessPath } from '../../lib/path'
import { Analytics } from '../Analytics'

jest.mock('../../lib/trpc')

test('Wisconsin Form works', async () => {
  const history = createMemoryHistory()

  const register = mocked(client, true).register = jest.fn().mockResolvedValue({
    type: 'data',
    data: 'confirmationId',
  })
  mocked(client, true).fetchAnalytics = jest.fn().mockResolvedValue({})

  const { getByLabelText, getByTestId } = render(
    <Router history={history}>
      <Analytics/>
      <Wisconsin
        locale={{
          state: 'Wisconsin',
          county: 'Dane County',
          city: 'Madison'
        }}
        address={sampleAddress}
      />
    </Router>,
    { wrapper: StateContainer }
  )

  act(() => {
    fireEvent.change(getByLabelText(/^Full Name/i), {
      target: {
        value: 'Bob Smith'
      },
    })
    fireEvent.change(getByLabelText(/^Birthdate/i), {
      target: {
        value: '03/22/1900'
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

    fireEvent.click(getByTestId('submit'), {
      bubbles: true,
      cancelable: true,
    })
  })

  await wait(() => expect(toPath(history.location.pathname)).toEqual<SuccessPath>(
    {id: "confirmationId", oid: "default", type: "success"}
  ))
  await wait(() => expect(register).toHaveBeenCalledTimes(1))
})
