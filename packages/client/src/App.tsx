import React from 'react'
import Container from 'muicss/lib/react/container'
import styled from 'styled-components'

import { add } from '@vbm/common'

import { InitialForm } from './components/Form'

const AppContainer = styled(Container)`
`

function App() {
  return (
    <AppContainer>
      <InitialForm/>
      <div>
      Learn React {add(2, 3)}
      </div>
    </AppContainer>

  );
}

export default App;
