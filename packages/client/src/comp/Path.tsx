import React from 'react'

import { PathEnum, pathData, useAppHistory } from '../lib/path'

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

  return <div id={scrollId} data-testid={scrollId}>
    {children}
  </div>
}
