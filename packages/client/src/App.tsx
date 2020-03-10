import React from 'react'
import Container from 'muicss/lib/react/container'
import styled from 'styled-components'

import { BrowserRouter } from "react-router-dom"
import { Switch, Route } from "react-router-dom"

import { InitialForm } from './comp/InitialForm'
import { DevInfo } from './comp/DevInfo'
import { Notification } from './comp/Notification'
import { QueryContainer, AddressContainer } from './lib/state'
import { Success } from './comp/Success'
import { WarningMsg } from './comp/WarningMsg'
import { Blurb } from './comp/Blurb'

export const AppContainer = styled(Container)`
  padding-top: 4em;
  min-height: 100vh;
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
    <Switch>
      <Route path='/success'>
        <AppContainer>
          <WarningMsg/>
          <Success/>
        </AppContainer>
      </Route>
      <Route path='/node-env'>
        <p>{process.env.NODE_ENV}</p>
      </Route>
      <Route exact path='/'>
        <Blurb/>
        <AppContainer id='app'>
          <WarningMsg/>
          <InitialForm/>
          <Notification />
        </AppContainer>
      </Route>
    </Switch>
    <DevInfo/>
  </>)
}

const App = () => (
  <StateContainer>
    <Layout/>
  </StateContainer>
)

export default App;
