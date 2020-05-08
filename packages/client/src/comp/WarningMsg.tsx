import React from 'react'
import Tabs from 'muicss/lib/react/tabs'
import Tab from 'muicss/lib/react/tab'

import { RedOutline } from './util/RedOutline'
import { sampleAddresses } from '../common/sampleAddresses'


const RawWarningMsg = () => {
  const states = Array.from(new Set(sampleAddresses.map(address => address.state)))
  
  return (<RedOutline>
    <h3>Warning: Not Production!</h3>
    <p>This is <b>not</b> a production build.
      In production, the application email is sent to both the local elections official and yourself.
      Since this is not production, the email is only sent to you.
      No email is sent to a local elections official so you can safely play with this demo.
    </p>
    <h4>Filling out the form:</h4>
    <p><b>Address:</b> You can fill this out with any address but to see it in action, you will need to use an address in the state.  Sample addresses are listed below.</p>
    <p><b>Email:</b> When prompted, please use your own email (so as to not spam others!)</p>
    
    <Tabs
      defaultSelectedIndex={0}
      style={{marginTop: '2em'}}
    >
      {
        states.map((state, key) => {
          return <Tab key={key} value={state} label={state}>
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
          </Tab>
        })
      }
    </Tabs>

  </RedOutline>)
}

export const WarningMsg = () => (
  (!process.env.REACT_APP_EMAIL_FAX_OFFICIALS) ? <RawWarningMsg/> : null
)
