import React from 'react'
import Checkbox from 'muicss/lib/react/checkbox'
import { CheckboxProps } from 'muicss/react'
import { createContainer } from 'unstated-next'

const useCheckbox = (init = false) => {
  const [checked, setCheck] = React.useState<boolean>(init)
  const toggleCheck = () => setCheck(!checked)
  return { checked, toggleCheck }
}
const CheckboxContainer = createContainer(useCheckbox)

interface Props extends CheckboxProps {
  children: (checked: boolean) => React.ReactNode
}

const RawTogglable: React.FC<Props> = ({children, ...props}) => {
  const { checked, toggleCheck } = CheckboxContainer.useContainer()

  // Matching style of input fields
  return <div style={{paddingTop: '15px', marginBottom: '20px'}}>
    <Checkbox
      {...props}
      checked={checked}
      onChange={toggleCheck}
    />
    {(checked && children) && children(checked)}
  </div>
}

export const Togglable: React.FC<Props> = (props) => {
  return <CheckboxContainer.Provider initialState={props.checked || false}>
    <RawTogglable {...props}/>
  </CheckboxContainer.Provider>
}
