import React from 'react'
import { client } from '../lib/trpc'
import { useAppHistory } from '../lib/path'
import { AnalyticsContainer } from '../lib/state'
import { initializeAnalytics } from '../lib/analytics'

export const Analytics: React.FC = () => {
  const { oid } = useAppHistory()
  const { analytics, setAnalytics } = AnalyticsContainer.useContainer()
  React.useEffect(() => {
    (async () => {
      // Load analytics once and only once
      if (!analytics) {
        const result = await client.fetchAnalytics(oid)
        if(result.type === 'data') {
          setAnalytics(result.data)
          initializeAnalytics(result.data)
        }
      }
    })()
  })

  return <></>
}
