import React from 'react'
import ReactPixel from 'react-facebook-pixel'
import { client } from '../lib/trpc'
import { useAppHistory } from '../lib/path'

const options = {
  autoConfig: true, 	// set pixel's autoConfig
  debug: false, 		// enable logs
}

export const Analytics: React.FC = () => {
  const { oid } = useAppHistory()
  React.useEffect(() => {
    (async () => {
      const result = await client.fetchAnalytics(oid)
      switch(result.type) {
        case 'data': {
          const { facebookId } = result.data
          if (facebookId) {
            ReactPixel.init(facebookId, undefined, options)
            ReactPixel.pageView()
          }
        }
      }
    })()
  })

  return <></>
}
