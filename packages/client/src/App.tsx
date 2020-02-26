import React from 'react'
import Container from 'muicss/lib/react/container'
import styled from 'styled-components'

import { add } from '@vbm/common'

import { InitialForm } from './comp/Form'
import { FL } from './comp/states/FL'

const AppContainer = styled(Container)`
`

function App() {
  return (
    <AppContainer>
      <InitialForm/>
      <FL/>
      <div>
      Learn React {add(2, 3)}
      </div>
    </AppContainer>

  );
}

export default App;
