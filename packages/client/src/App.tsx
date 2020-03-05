import React from 'react'
import Container from 'muicss/lib/react/container'
import styled from 'styled-components'

import { client } from './lib/trpc'
import { InitialForm } from './comp/Form'
import { QueryContainer, LocaleContainer } from './lib/state'
import { StateForm } from './comp/states'
import { BrowserRouter, Switch, Route } from "react-router-dom"

const AppContainer = styled(Container)`
  margin-top: 2em
`

const StateContainer = (props: React.PropsWithChildren<{}>) => (
  <BrowserRouter>
    <QueryContainer.Provider>
      <LocaleContainer.Provider>
        {props.children}
      </LocaleContainer.Provider>
    </QueryContainer.Provider>
  </BrowserRouter>
)

const Layout = () => {
  const [sum, setSum] = React.useState(0)
  client.add(2, 3).then(result => {
    switch (result.type) {
      case 'data': {
        setSum(result.data)
        break
      }
      default: {
        console.log('error')
      }
    }
  })
  return (
    <AppContainer>
      <InitialForm/>
      <Switch>
        <Route path={`/:state/:county`}>
          <StateForm/>
        </Route>
      </Switch>
      <div>
        Learn React {sum}
      </div>
      <div>
        Variable {process.env.REACT_APP_SERVER}
      </div>
      <div>
        Variable 2 {process.env.NODE_ENV}
      </div>
    </AppContainer>
  )
}

const App = () => (
  <StateContainer>
    <Layout/>
  </StateContainer>
)

export default App;
