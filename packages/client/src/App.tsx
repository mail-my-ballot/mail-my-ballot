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

export const StyleContainer = styled(Container)`
  padding-top: 4em;
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
      <Route path='/success'>
        <StyleContainer>
          <WarningMsg/>
          <Success/>
        </StyleContainer>
      </Route>
      <Route path='/address/:state/:zip?'>
        <Blurb/>
        <StyleContainer id='address-form' data-testid='address-form'>
          <WarningMsg/>
          <AddressForm/>
        </StyleContainer>
      </Route>
      <Route path='/state/:state/'>
        <StyleContainer>
          <WarningMsg/>
          <AddressForm/>
          <div id='state-form' data-testid='state-form'>
            <StateForm/>
          </div>
        </StyleContainer>
      </Route>
      <Route exact path='/'>
        <Blurb/>
        <StyleContainer>
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
