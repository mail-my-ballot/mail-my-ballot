import React from 'react'
import 'jest-canvas-mock'
import { render, fireEvent, act, wait, RenderResult } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'
import SignatureCanvas from 'react-signature-canvas'
jest.mock('react-signature-canvas')

import { Michigan } from './Michigan'
import { Wisconsin } from './Wisconsin'
import { StateContainer } from "../StateContainer"
import { client } from '../../lib/trpc'
import { mocked } from 'ts-jest/utils'
import { sampleAddress } from '../../common/sampleAddresses'
import { toPath, SuccessPath } from '../../lib/path'
import { Analytics } from '../Analytics'
jest.mock('../../lib/trpc')

/** Fill out form without signing */
const fillWithoutSigning = ({getByLabelText, getByTestId}: RenderResult) => {
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

    SignatureCanvas.prototype.isEmpty = jest.fn(() => true)
    mocked(window, true).alert = jest.fn()

    fireEvent.click(getByTestId('submit'), {
      bubbles: true,
      cancelable: true,
    })
  })
}

const signForm = ({getByTestId}: RenderResult) => {
  // now sign form
  act(() => {
    // Mock signing
    SignatureCanvas.prototype.isEmpty = jest.fn(() => false)
    SignatureCanvas.prototype.toDataURL = jest.fn(() => 'abcd')
    mocked(window, true).alert = jest.fn()

    fireEvent.click(getByTestId('submit'), {
      bubbles: true,
      cancelable: true,
    })
  })
}

test('Michigan Form works', async () => {
  const history = createMemoryHistory()

  const register = mocked(client, true).register = jest.fn().mockResolvedValue({
    type: 'data',
    data: 'confirmationId',
  })
  mocked(client, true).fetchAnalytics = jest.fn().mockResolvedValue({})

  // load page
  const renderResult = render(
    <Router history={history}>
      <Analytics/>
      <Michigan
        locale={{
          state: 'Michigan',
          county: 'Wayne County',
          city: 'Canton'
        }}
        address={sampleAddress}
      />
    </Router>,
    { wrapper: StateContainer }
  )

  fillWithoutSigning(renderResult)

  // this fails
  await wait(() => expect(register).toHaveBeenCalledTimes(0))
  await wait(() => expect(window.alert).toHaveBeenCalledTimes(1))

  signForm(renderResult)

  // this succeeds
  await wait(() => expect(toPath(history.location.pathname)).toEqual<SuccessPath>(
    {id: "confirmationId", oid: "default", type: "success"}
  ))
  await wait(() => expect(window.alert).toHaveBeenCalledTimes(0))
  await wait(() => expect(register).toHaveBeenCalledTimes(1))
})

test('Wisconsin Form works', async () => {
  const history = createMemoryHistory()

  const register = mocked(client, true).register = jest.fn().mockResolvedValue({
    type: 'data',
    data: 'confirmationId',
  })
  mocked(client, true).fetchAnalytics = jest.fn().mockResolvedValue({})

  const renderResult = render(
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

  fillWithoutSigning(renderResult)

  await wait(() => expect(toPath(history.location.pathname)).toEqual<SuccessPath>(
    {id: "confirmationId", oid: "default", type: "success"}
  ))
  await wait(() => expect(register).toHaveBeenCalledTimes(1))
})
