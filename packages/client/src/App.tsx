import React from 'react'
import Container from 'muicss/lib/react/container'
import styled from 'styled-components'

import { BrowserRouter } from "react-router-dom"
import { Switch, Route } from "react-router-dom"

import { InitialForm } from './comp/InitialForm'
import { DevInfo } from './comp/DevInfo'
import { QueryContainer, AddressContainer } from './lib/state'
import { Success } from './comp/Success'
import { WarningMsg } from './comp/WarningMsg'
import { Blurb } from './comp/Blurb'

export const AppContainer = styled(Container)`
  margin-top: 4em
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
  return (<>
    <Blurb/>
    <AppContainer>
      <Switch>
        <Route path='/success'>
          <Success/>
        </Route>
        <Route path='/'>
          <InitialForm/>
        </Route>
      </Switch>
      <DevInfo/>
      <WarningMsg/>
    </AppContainer>
  </>)
}

const App = () => (
  <StateContainer>
    <Layout/>
  </StateContainer>
)

export default App;
