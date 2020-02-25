import React from 'react'
import Container from 'muicss/lib/react/container'
import Button from 'muicss/lib/react/button'
import styled from 'styled-components'

import { add } from '@vbm/common'

const AppContainer = styled(Container)`
  text-align: center;
`

function App() {
  return (
    <AppContainer>
      <Button>Test Button</Button>
      <div>
      Learn React {add(2, 3)}
      </div>
    </AppContainer>

  );
}

export default App;
