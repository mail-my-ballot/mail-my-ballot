import React from 'react'
import Checkbox from 'muicss/lib/react/checkbox'
import { CheckboxProps } from 'muicss/react'
import { createContainer } from 'unstated-next'
import styled from 'styled-components'

const useCheckbox = (init = false) => {
  const [checked, setCheck] = React.useState<boolean>(init)
  const toggleCheck = () => setCheck(!checked)
  return { checked, toggleCheck }
}
const CheckboxContainer = createContainer(useCheckbox)

interface Props extends CheckboxProps {
  children: (checked: boolean) => React.ReactNode
}

const Wrapper = styled.div`
  padding-top: 15px;
  margin-bottom: 20px;
`

const RawTogglable: React.FC<Props> = ({children, ...props}) => {
  const { checked, toggleCheck } = CheckboxContainer.useContainer()

  // Matching style of input fields
  return <Wrapper>
    <Checkbox
      {...props}
      checked={checked}
      onChange={toggleCheck}
    />
    {(checked && children) && children(checked)}
  </Wrapper>
}

export const Togglable: React.FC<Props> = (props) => {
  return <CheckboxContainer.Provider initialState={props.checked || false}>
    <RawTogglable {...props}/>
  </CheckboxContainer.Provider>
}
