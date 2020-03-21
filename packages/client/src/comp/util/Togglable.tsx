import React from 'react'
import Checkbox from 'muicss/lib/react/checkbox'
import { CheckboxProps, InputProps } from 'muicss/react'
import Input from 'muicss/lib/react/input'
import { createContainer } from 'unstated-next'
import { BaseInput } from './Input'

const useCheckbox = (init: boolean = false) => {
  const [checked, setCheck] = React.useState<boolean>(init)
  const toggleCheck = () => setCheck(!checked)
  return { checked, toggleCheck }
}
const CheckboxContainer = createContainer(useCheckbox)

type Props<P extends InputProps> = Omit<P, 'required'> & { toggleProps: CheckboxProps }

export const togglableInput = <P extends InputProps>(InputComponent: React.ComponentType<P>) => {
  return React.forwardRef<Input, Props<P>>(({toggleProps, ...props}, ref) => {
    const { checked, toggleCheck } = CheckboxContainer.useContainer()

    return <CheckboxContainer.Provider>
      <Checkbox
        {...toggleProps}
        checked={checked}
        onChange={toggleCheck}
      />
      {(
        checked
      ) ? (
        <InputComponent {...props} required={checked} ref={ref}/>
      ) : (
        null
      )}
    </CheckboxContainer.Provider>
  })
}

export const TogglableInput = togglableInput(BaseInput)
