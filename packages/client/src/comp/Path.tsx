import React from 'react'

import { PathEnum, pathData } from '../lib/path'

interface Props {
  pathEnum: PathEnum
  pageStart?: boolean
}

export const ScrollHook: React.FC<Props> = ({pathEnum, pageStart, children}) => {
  const { scrollId } = pathData[pathEnum]
  React.useEffect(() => {
    if (pageStart) {
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
