import React from 'react'
import styled from 'styled-components'
import { PathEnum, pathData, useAppHistory } from '../lib/path'

const Container = styled.div`
  max-width: 100%;
  @media only screen and (max-width: 414px) {
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: left;
    text-align: left;
    justify-content: left;
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

  // Automatically go to the location on pageStart if path.scroll is not set
  React.useEffect(() => {
    if (pageStart && !scroll) {
      document.getElementById(scrollId)?.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      })
    }
  }, [pageStart, scroll, scrollId])

  return <Container id={scrollId} data-testid={scrollId}>
    {children}
  </Container>
}
