import React from 'react'

import { FeatureFlagsContainer } from '../lib/unstated'
import { client } from '../lib/trpc'


export const Status = () => {
  const [sum, setSum] = React.useState<number | string>('loading ...')
  const { featureFlags } = FeatureFlagsContainer.useContainer()
  
  React.useEffect(() => {
    (async () => {
      const resp =  await client.add(2, 3)
      switch(resp.type) {
        case 'data': {
          setSum(resp.data)
          break
        }
        case 'error': {
          setSum(resp.message)
          break
        }
      }
    })()
  })

  return <div>
    <h1> Environment Variables </h1>
    <ul>
      <li>NODE_ENV: {process.env.NODE_ENV}</li>
      <li>REACT_APP_ENVIRONMENT: {process.env.REACT_APP_ENVIRONMENT}</li>
      <li>EMAIL_FAX_OFFICIALS: {JSON.stringify(featureFlags?.emailFaxOfficials)}</li>
      <li>2 + 3 = {sum}</li>
    </ul>
  </div>
}