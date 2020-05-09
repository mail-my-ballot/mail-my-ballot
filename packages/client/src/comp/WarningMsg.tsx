import React from 'react'
import Dropdown from 'muicss/lib/react/dropdown'
import DropdownItem from 'muicss/lib/react/dropdown-item'

import { RedOutline } from './util/RedOutline'
import { sampleAddresses } from '../common/sampleAddresses'
import { AddressContainer } from '../lib/state'
import { State } from '../common'


const RawWarningMsg = () => {
  const states = Array.from(new Set(sampleAddresses.map(address => address.state)))
  const { locale } = AddressContainer.useContainer()
  const [state, setState] = React.useState<State>(locale?.state ?? 'Florida')
  
  return (<RedOutline>
    <h3>Warning: Not Production!</h3>
    <p>This is <b>not</b> a production build.
      In production, the application email is sent to both the local elections official and yourself.
      Since this is not production, the email is only sent to you.
      No email is sent to a local elections official so you can safely play with this demo.
    </p>
    <h4>Filling out the form:</h4>
    <p><b>Address:</b> You can fill this out with any address.  But to see it in action, you will want to use an address in a state we support.  Sample addresses are listed below.</p>
    <p><b>Email:</b> When prompted, please use your own email (so as to not spam others!)</p>

    <Dropdown
      label={state}
      color='primary'
      style={{marginTop: '2em'}}
    >
      {
        states.sort().map((state, key) => {
          return <DropdownItem
            key={key}
            onClick={() => setState(state)}
          >
            {state}
          </DropdownItem>
        })
      }
    </Dropdown>
    <ul style={{marginTop: '1em'}}>
      {sampleAddresses
        .filter(addrData => addrData.state === state )
        .map((addrData, key) => <li key={key}>
          {addrData.address} ({addrData.city}, {addrData.county}, {addrData.state})
          <button
            style={{marginLeft: '1em'}}
            onClick={() => {
              const input = document.getElementById('addr-input') as HTMLInputElement
              input.value = addrData.address
              document.getElementById('addr-submit')?.click()
            }}
          >
            Fill
          </button>
        </li>
      )}
    </ul>

  </RedOutline>)
}

export const WarningMsg = () => (
  (!process.env.REACT_APP_EMAIL_FAX_OFFICIALS) ? <RawWarningMsg/> : null
)
