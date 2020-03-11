import React from 'react'
import { RedOutline } from './util/RedOutline'

const RawWarningMsg = () => {
  return (<RedOutline>
    <h3>Warning: Not Production!</h3>
    <p>This is not a production build.
      If this were production, the registration email would be sent to both the county official and yourself.
      Since this is not production, the email will only be sent to you.
      No email will be sent to a county official so you can safely play with this demo.
    </p>
  </RedOutline>)
}

export const WarningMsg = () => {
  if (process.env.REACT_APP_SHOW_WARNING) {
    return <RawWarningMsg/>
  } else {
    return null
  }
}
