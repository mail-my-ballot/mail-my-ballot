import React from 'react'

import { PathEnum, pathData, useAppHistory } from '../lib/path'

interface Props {
  pathEnum: PathEnum
  pageStart?: boolean
}

export const ScrollHook: React.FC<Props> = ({pathEnum, pageStart, children}) => {
  const { scrollId } = pathData[pathEnum]
  const { path } = useAppHistory()

  // Automatically go to the location on pageStart if path.scroll is not set
  React.useEffect(() => {
    if (pageStart && !path?.scroll) {
      document.getElementById(scrollId)?.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      })
    }
  })

  return <div id={scrollId} data-testid={scrollId}>
    {children}
  </div>
}
