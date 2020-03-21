import React from 'react'
import Checkbox from 'muicss/lib/react/checkbox'
import { CheckboxProps } from 'muicss/react'
import { createContainer } from 'unstated-next'

const useCheckbox = (init: boolean = false) => {
  const [checked, setCheck] = React.useState<boolean>(init)
  const toggleCheck = () => setCheck(!checked)
  return { checked, toggleCheck }
}
const CheckboxContainer = createContainer(useCheckbox)

type Props = CheckboxProps & {
  children(checked: boolean): React.ReactNode
}

const RawTogglableInput: React.FC<Props> = ({children, ...props}) => {
  const { checked, toggleCheck } = CheckboxContainer.useContainer()

  return <CheckboxContainer.Provider>
    <Checkbox
      {...props}
      checked={checked}
      onChange={toggleCheck}
    />
    {(
      checked
    ) ? (
      children(checked)
    ) : (
      null
    )}
  </CheckboxContainer.Provider>
}

export const TogglableInput: React.FC<Props> = (props) => {
  return <CheckboxContainer.Provider>
    <RawTogglableInput {...props}/>
  </CheckboxContainer.Provider>
}
