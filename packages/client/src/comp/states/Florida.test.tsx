import React from 'react'
import { render, fireEvent, act, wait } from '@testing-library/react'
import { createMemoryHistory } from "history";
import { Router } from "react-router";

import { Florida } from './Florida'
import { StateContainer } from '../../App'
import { client } from '../../lib/trpc'
import { mocked } from 'ts-jest/utils'
import { AddressContainer } from '../../lib/state';
import { sampleFloridaAddress } from '../../common/testData';
jest.mock('../../lib/trpc')

test('Florida Form works', async () => {
  const history = createMemoryHistory();

  const { getByLabelText, getByTestId } = render(
    <AddressContainer.Provider initialState={sampleFloridaAddress}>
      <Router history={history}>
        <Florida locale={{state: 'Flordida', county: 'Miami-Dade County'}}/>
      </Router>
    </AddressContainer.Provider>,
    { wrapper: StateContainer }
  )

  const register = mocked(client, true).register = jest.fn().mockResolvedValue({
    type: 'data',
    data: 'xxx',
  })

  act(() => {
    fireEvent.change(getByLabelText(/^Name/i), {
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

  await wait(() => expect(history.location.pathname).toBe("/success"))
  await wait(() => expect(register).toHaveBeenCalled())
})
