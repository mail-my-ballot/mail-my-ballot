import React from 'react'
import Container from 'muicss/lib/react/container'
import styled from 'styled-components'

import { Switch, Route, Redirect } from "react-router-dom"

import { About } from './comp/About'
import { Footer } from './comp/Footer'
import { Analytics } from './comp/Analytics'
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
import { StateContainer } from './comp/StateContainer'

const TallStyleContainer = styled(Container)`
  min-height: 100vh;
`

const StyleContainer = Container

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
  <StateContainer>
    <Analytics/>
    <Layout/>
  </StateContainer>
  <script src="http://maps.googleapis.com/maps/api/js?key=API-KEY"></script>
</>)

export default App
