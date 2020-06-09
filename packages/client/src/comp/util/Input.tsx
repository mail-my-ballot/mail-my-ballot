import React from 'react'
import { forwardRef } from 'preact/compat'
import Input from 'muicss/lib/react/input'
import { InputProps } from 'muicss/react'
import styled from 'styled-components'

// Note the anonymous functions passed to React.forwardRef need to be named for displayName
// See https://github.com/facebook/react/issues/13703#issuecomment-423346302

const Red = styled.sup`
  color: rgb(220, 14, 82);
`

export const BaseInput = forwardRef<Input, InputProps>(function BaseInput(props, ref) {
  return <Input
    floatingLabel={true}
    {...props}
    label={<span>{props.label} {props.required ? <Red>*</Red> : null}</span>}
    ref={ref}
  />
})

export const NameInput = forwardRef<Input, InputProps>(function NameInput(props, ref) {
  return <BaseInput
    label='Full Name'
    type='text'
    {...props}
    ref={ref}
  />
})

export const BirthDateInput = forwardRef<Input, InputProps>(function BirthDateInput(props, ref) {
  return <BaseInput
    label='Birthdate (mm/dd/yyyy)'
    floatingLabel={false}
    type='date'
    {...props}
    ref={ref}
  />
})

export const PhoneInput = forwardRef<Input, InputProps>(function PhoneInput(props, ref) {
  return <BaseInput
    label='Phone (123-456-7890)'
    type='tel'
    pattern='[0-9]{3}-?[0-9]{3}-?[0-9]{4}'
    {...props}
    ref={ref}
  />
})

export const EmailInput = forwardRef<Input, InputProps>(function EmailInput(props, ref) {
  return <BaseInput
    label='Email'
    type='email'
    {...props}
    ref={ref}
  />
})

