import React from 'react'
import styled from 'styled-components'
import { PathEnum, pathData, useAppHistory } from '../lib/path'

const Container = styled.div`
  max-width: 100%;
  @media only screen and (max-width: 414px) {
    top: 0;
    left: 0;
    max-width: max-content;
    align-content: center;
    text-align: center;
    justify-content: center;
  }
`

interface Props {
  pathEnum: PathEnum
  pageStart?: boolean
}

export const ScrollHook: React.FC<Props> = ({pathEnum, pageStart, children}) => {
  const { scrollId } = pathData[pathEnum]
  const { query } = useAppHistory()
  const scroll = query?.scroll

  const [width, setWidth] = React.useState('100vw')
  React.useEffect(() => {
    setWidth(`${window.innerWidth}px`)
  }, [])

  // Automatically go to the location on pageStart if path.scroll is not set
  React.useEffect(() => {
    if (pageStart && !scroll) {
      document.getElementById(scrollId)?.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      })
    }
  }, [pageStart, scroll, scrollId])

  return <Container id={scrollId} data-testid={scrollId} style={{width}}>
    {children}
  </Container>
}
