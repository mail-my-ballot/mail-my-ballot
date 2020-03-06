import React from 'react'
import { RedOutline } from './util/RedOutline'

const RawWarningMsg = () => {
  return (<RedOutline>
    <h3>Warning: Not Production!</h3>
    <p>This is not a production build.  The emails will not be sent to county officials.  You can safely play with this demo.  This message will not appear in production.
    </p>
  </RedOutline>)
}

export const WarningMsg = () => {
  if ((process.env.NODE_ENV !== 'production')) {
    return <RawWarningMsg/>
  } else {
    return null
  }
}
