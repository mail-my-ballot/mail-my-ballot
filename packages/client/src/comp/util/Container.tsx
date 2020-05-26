import Container from 'muicss/lib/react/container'
import styled from 'styled-components'

export const StyleContainer = styled(Container)`
  @media only screen and (max-width: 400px) {
    padding-left: 10px;
    padding-right: 10px;
  }
  max-width: 752px;
`
