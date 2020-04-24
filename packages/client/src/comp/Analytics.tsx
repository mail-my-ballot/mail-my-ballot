import React from 'react'
import ReactPixel from 'react-facebook-pixel'
import { client } from '../lib/trpc'
import { useAppHistory } from '../lib/path'
import { AnalyticsContainer } from '../lib/state'

const options = {
  autoConfig: true, 	// set pixel's autoConfig
  debug: false, 		// enable logs
}

export const Analytics: React.FC = () => {
  const { oid } = useAppHistory()
  const { analytics, setAnalytics } = AnalyticsContainer.useContainer()
  React.useEffect(() => {
    (async () => {
      // Load analytics once and only once
      if (Object.keys(analytics).length === 0) {
        const result = await client.fetchAnalytics(oid)
        if(result.type === 'data') {
          setAnalytics(result.data)
        }
      }

      // trigger facebook pixel
      const { facebookId } = analytics
      if (facebookId) {
        ReactPixel.init(facebookId, undefined, options)
        ReactPixel.pageView()
      }
    })()
  })

  return <></>
}
