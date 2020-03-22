import React from 'react'
import { RedOutline } from './util/RedOutline'
import { sampleAddresses } from '../common/sampleAddresses'

const RawWarningMsg = () => {
  return (<RedOutline>
    <h3>Warning: Not Production!</h3>
    <p>This is <b>not</b> a production build.
      In production, the application email is sent to both the local elections official and yourself.
      Since this is not production, the email is only sent to you.
      No email is sent to a local elections official so you can safely play with this demo.
    </p>
    <h4>Filling out the form:</h4>
    <p><b>Address:</b> You can fill this out with any address but to see it in action, use one of the following addresses:</p>
    <ul>
      {sampleAddresses.map(([addr, county], key) => <li key={key}>{addr} ({county})</li>)}
    </ul>
    <p><b>Email:</b> When prompted, please use your own email (so as to not spam others!)</p>
  </RedOutline>)
}

export const WarningMsg = () => (
  process.env.REACT_APP_SHOW_WARNING ? <RawWarningMsg/> : null
)
