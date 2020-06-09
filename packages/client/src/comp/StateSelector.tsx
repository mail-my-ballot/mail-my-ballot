import React from 'react'
import Dropdown from 'muicss/lib/react/dropdown'
import DropdownItem from 'muicss/lib/react/dropdown-item'

import { createContainer } from "unstated-next"

import { implementedStates, ImplementedState } from '../common'

const useStateContainer = (initialState: ImplementedState = 'Florida') => {
  const [state, setState] = React.useState<ImplementedState>(initialState)
  return { state, setState }
}

export const StateContainer = createContainer(useStateContainer)

interface Props {
  initialState?: ImplementedState
}

const RawStateSelector: React.FC<{}> = () => {
  const {state, setState} = StateContainer.useContainer()
  return <Dropdown
    label={state}
    color='primary'
    style={{marginTop: '2em'}}
    translate="no" 
    lang="en"
    >
    {
      [...implementedStates].sort().map((state, key) => {
        return <DropdownItem
          key={key}
          onClick={() => setState(state)}
          translate="no" 
          lang="en"
        >
          {state}
        </DropdownItem>
      })
    }
  </Dropdown>
}

export const StateSelector: React.FC<Props> = ({initialState, children}) => {
  

  return <StateContainer.Provider initialState={initialState}>
    <RawStateSelector/>
    {children}
  </StateContainer.Provider>
}

