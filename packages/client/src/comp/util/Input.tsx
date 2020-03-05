import React from 'react'
import Input from 'muicss/lib/react/input'
import { InputProps } from 'muicss/react'

export const MyInput = (props: InputProps) => {
  const { inputRef, ...passProps } = props
  return <Input
    {...passProps}
    ref={el => {
      if (el && inputRef instanceof Function) {
        inputRef((el as any).controlEl as HTMLInputElement)
      }
    }}
  />
}
