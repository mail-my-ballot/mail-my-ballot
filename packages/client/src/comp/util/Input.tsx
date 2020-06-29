import React from 'react'
import Input from 'muicss/lib/react/input'
import { InputProps } from 'muicss/react'

import { Red } from './Util'

// Note the anonymous functions passed to React.forwardRef need to be named for displayName
// See https://github.com/facebook/react/issues/13703#issuecomment-423346302
export const BaseInput = React.forwardRef<Input, InputProps>(function BaseInput(props, ref) {
  return <Input
    floatingLabel={true}
    {...props}
    label={<span>{props.label} {props.required ? <Red>*</Red> : null}</span>}
    ref={ref}
  />
})

export const NameInput = React.forwardRef<Input, InputProps>(function NameInput(props, ref) {
  return <BaseInput
    label='Full Name'
    type='text'
    {...props}
    ref={ref}
  />
})

export const DateInput = React.forwardRef<Input, InputProps>(function DateInput(props, ref) {
  return <BaseInput
    type='text'
    pattern='^(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])/(19|20)\d\d$'
    {...props}
    label={`${props.label} (mm/dd/yyyy)`}
    ref={ref}
  />
})

export const BirthdateInput = React.forwardRef<Input, InputProps>(function BirthdateInput(props, ref) {
  return <DateInput
    label='Birthdate'
    {...props}
    ref={ref}
  />
})

export const PhoneInput = React.forwardRef<Input, InputProps>(function PhoneInput(props, ref) {
  return <BaseInput
    label='Phone (123-456-7890)'
    type='tel'
    pattern='[0-9]{3}-?[0-9]{3}-?[0-9]{4}'
    {...props}
    ref={ref}
  />
})

export const EmailInput = React.forwardRef<Input, InputProps>(function EmailInput(props, ref) {
  return <BaseInput
    label='Email'
    type='email'
    {...props}
    ref={ref}
  />
})

