import React from 'react'
import { render, fireEvent, act, wait } from '@testing-library/react'
import { Togglable } from './Togglable'
import { BaseInput } from './Input'

test('Togglable enables and disables interior element', async () => {
  const { queryByTestId, getByLabelText } = render(
    <Togglable label='Enable' id='enable'>{
      (checked) => <BaseInput data-testid='input' required={checked}/>
    }</Togglable>
  )

  expect(queryByTestId('input')).toBeNull()

  act(() => {
    fireEvent.click(getByLabelText(/^Enable/))
  })

  await wait(() => expect(queryByTestId('input')).toBeTruthy())

  act(() => {
    fireEvent.click(getByLabelText(/^Enable/))
  })

  await wait(() => expect(queryByTestId('input')).toBeNull())
})
