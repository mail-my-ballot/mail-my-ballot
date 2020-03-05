import React from 'react'
import Container from 'muicss/lib/react/container'
import styled from 'styled-components'
import { BrowserRouter } from "react-router-dom"

import { InitialForm } from './comp/InitialForm'
import { DevBox } from './comp/DevBox'
import { QueryContainer, AddressContainer } from './lib/state'


const AppContainer = styled(Container)`
  margin-top: 2em
`

const StateContainer = (props: React.PropsWithChildren<{}>) => (
  <BrowserRouter>
    <QueryContainer.Provider>
      <AddressContainer.Provider>
        {props.children}
      </AddressContainer.Provider>
    </QueryContainer.Provider>
  </BrowserRouter>
)

const Layout = () => {
  return (
    <AppContainer>
      <InitialForm/>
      <DevBox/>
    </AppContainer>
  )
}

const App = () => (
  <StateContainer>
    <Layout/>
  </StateContainer>
)

export default App;
