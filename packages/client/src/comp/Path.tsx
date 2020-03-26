import React from 'react'

import { PathEnum, pathData } from '../lib/path'

export const ScrollHook: React.FC<{pathEnum: PathEnum}> = ({pathEnum, children}) => {
  const { scrollId } = pathData[pathEnum]
  return <div id={scrollId} data-testid={scrollId}>
    {children}
  </div>
}
