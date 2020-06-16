import React from 'react'
import styled from 'styled-components'
import {Helmet} from "react-helmet"

import { Switch, Route, Redirect } from "react-router-dom"

import { About } from './comp/About'
import { Footer } from './comp/Footer'
import { Initialize } from './comp/Initialize'
import { AddressForm } from './comp/AddressForm'
import { DevInfo } from './comp/DevInfo'
import { Success } from './comp/Success'
import { Status } from './comp/Status'
import { WarningMsg } from './comp/WarningMsg'
import { Blurb } from './comp/Blurb'
import { StateForm } from './comp/states/StateForm'
import { Notification } from './comp/Notification'
import { ScrollHook } from './comp/Path'
import { pathData, defaultUrl } from './lib/path'
import { UnstatedContainer } from './comp/StateContainer'
import { StateRedirect } from './comp/StateRedirect'
import { MockPage } from './comp/MockPage'
import { StyleContainer } from './comp/util/Container'
import { processEnvOrThrow } from './common'

const TallStyleContainer = styled(StyleContainer)`
  min-height: 100vh;
`


const Layout = () => {
  return (<>
    <Switch>
      <Route path='/status'>
        <StyleContainer>
          <Status/>
        </StyleContainer>
      </Route>
      <Route path='/about'>
        <TallStyleContainer>
          <About/>
        </TallStyleContainer>
      </Route>
      <Redirect exact from='/' to={defaultUrl}/>
      <Route exact path='/mock'>
        <TallStyleContainer>
          <MockPage/>
        </TallStyleContainer>
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
          <TallStyleContainer>
            <Success/>
            <WarningMsg/>
          </TallStyleContainer>
        </ScrollHook>
      </Route>
      <Route path={pathData['address'].path}>
        <Blurb/>
        <TallStyleContainer>
          <ScrollHook pathEnum='address' pageStart>
            <AddressForm/>
          </ScrollHook>
          <Notification/>
          <WarningMsg/>
        </TallStyleContainer>
      </Route>
      <Route path={pathData['stateRedirect'].path} exact>
        <StateRedirect/>
      </Route>
      <Route path={pathData['state'].path}>
        <Blurb/>
        <TallStyleContainer>
          <AddressForm/>
          <ScrollHook pathEnum='state'>
            <StateForm/>
          </ScrollHook>
          <Notification/>
          <WarningMsg/>
        </TallStyleContainer>
      </Route>
      <Redirect to={defaultUrl}/>
    </Switch>
    <StyleContainer>
      <DevInfo/>
    </StyleContainer>
    <Footer/>
  </>)
}

const App = () => (<>
  <UnstatedContainer>
    <Helmet>
      <script src={`https://www.googleoptimize.com/optimize.js?id=${processEnvOrThrow('REACT_APP_GOOGLE_OPTIMIZE')}`}></script>
    </Helmet>
    <Initialize/>
    <Layout/>
  </UnstatedContainer>
</>)

export default App
