import React from 'react'
import ReactPixel from 'react-facebook-pixel'
import { client } from '../lib/trpc'
import { useAppHistory } from '../lib/path'

const options = {
  autoConfig: true, 	// set pixel's autoConfig
  debug: false, 		// enable logs
}

export const Analytics: React.FC = () => {
  const { org } = useAppHistory()
  React.useEffect(() => {
    (async () => {
      const result = await client.fetchAnalytics(org)
      switch(result.type) {
        case 'data': {
          const { facebookId } = result.data
          if (facebookId) ReactPixel.init(facebookId, undefined, options)
        }
      }
    })()
  })

  return <></>
}
