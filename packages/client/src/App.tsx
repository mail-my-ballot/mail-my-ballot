import React from 'react'
import Container from 'muicss/lib/react/container'
import styled from 'styled-components'

import { HashRouter, Switch, Route } from "react-router-dom"

import { AddressForm } from './comp/AddressForm'
import { DevInfo } from './comp/DevInfo'
import { QueryContainer, AddressContainer, ContactContainer } from './lib/state'
import { Success } from './comp/Success'
import { WarningMsg } from './comp/WarningMsg'
import { Blurb } from './comp/Blurb'
import { StateForm } from './comp/states/StateForm'
import { Notification } from './comp/Notification'
import { ScrollHook } from './comp/Path'
import { pathData } from './lib/path'

export const StyleContainer = styled(Container)`
  min-height: 100vh;
`

// export for testing purposes
export const StateContainer: React.FC<{}> = (props) => (
  <HashRouter>
    <QueryContainer.Provider>
      <AddressContainer.Provider>
        <ContactContainer.Provider>
          {props.children}
        </ContactContainer.Provider>
      </AddressContainer.Provider>
    </QueryContainer.Provider>
  </HashRouter>
)

const Layout = () => {
  return (<>
    <Switch>
      <Route path='/node-env'>
        <p>{process.env.NODE_ENV}</p>
      </Route>
      <Route exact path={pathData['start'].path}>
        <ScrollHook pathEnum='start'>
          <Blurb/>
        </ScrollHook>
        <StyleContainer>
          <WarningMsg/>
        </StyleContainer>
      </Route>
      <Route path={pathData['success'].path}>
        <ScrollHook pathEnum='success'>
          <StyleContainer>
            <WarningMsg/>
            <Success/>
          </StyleContainer>
        </ScrollHook>
      </Route>
      <Route path={pathData['address'].path}>
        <Blurb/>
        <StyleContainer>
          <ScrollHook pathEnum='address'>
            <AddressForm/>
          </ScrollHook>
          <Notification/>
          <WarningMsg/>
        </StyleContainer>
      </Route>
      <Route path={pathData['state'].path}>
        <Blurb/>
        <StyleContainer>
          <AddressForm/>
          <ScrollHook pathEnum='state'>
            <StateForm/>
          </ScrollHook>
          <Notification/>
          <WarningMsg/>
        </StyleContainer>
      </Route>
    </Switch>
    <StyleContainer>
      <DevInfo/>
    </StyleContainer>
  </>)
}

const App = () => (
  <StateContainer>
    <Layout/>
  </StateContainer>
)

export default App
