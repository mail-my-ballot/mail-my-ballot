import React from 'react'
import Container from 'muicss/lib/react/container'
import styled from 'styled-components'

import { makeClient, httpConnector } from '@tianhuil/simple-trpc/dist/client'
import { IVbmRpc } from '@vbm/common'

import { InitialForm } from './comp/Form'
import { FL } from './comp/states/FL'

const AppContainer = styled(Container)`
`
const client = makeClient<IVbmRpc>(httpConnector('http://localhost:8080'))


function App() {
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
      <FL/>
      <div>
        Learn React {sum}
      </div>
      <div>
        Variable {process.env.REACT_APP_SERVER}
        Variable 2 {process.env.NODE_ENV}
      </div>
    </AppContainer>

  );
}

export default App;
