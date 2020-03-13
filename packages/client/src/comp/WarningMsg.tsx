import React from 'react'
import { RedOutline } from './util/RedOutline'

const RawWarningMsg = () => {
  return (<RedOutline>
    <h3>Warning: Not Production!</h3>
    <p>This is <b>not</b> a production build.
      In production, the application email is sent to both the county official and yourself.
      Since this is not production, the email is only sent to you.
      No email is sent to a county official so you can safely play with this demo.
    </p>
    <h4>Filling out the form:</h4>
    <p><b>Address:</b> You can fill this out with any address but to see it in action, use one of the following addresses:</p>
    <ul>
      <li>100 S Biscayne Blvd, Miami, FL 33131 (Miami-Dade County)</li>
      <li>5443 Main St, Port Richey, FL 34652 (Pasco County)</li>
      <li>2000 W Commercial Blvd, Fort Lauderdale, FL 33309 (Broward County)</li>
    </ul>
    <p><b>Email:</b> When prompted, please use your own email (so as to not spam others!)</p>
  </RedOutline>)
}

export const WarningMsg = () => {
  if (process.env.REACT_APP_SHOW_WARNING) {
    return <RawWarningMsg/>
  } else {
    return null
  }
}
