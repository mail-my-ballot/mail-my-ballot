import React from 'react'
import { client } from '../lib/trpc'
import { useAppHistory } from '../lib/path'
import { AnalyticsContainer, UserContainer, useDeepMemoize } from '../lib/unstated'
import { initializeAnalytics } from '../lib/analytics'
import { UTM } from '../common'

export const Initialize: React.FC = () => {
  const { oid } = useAppHistory()
  const { setAnalytics } = AnalyticsContainer.useContainer()
  const { conservativeUpdateUserData } = UserContainer.useContainer()
  const { query } = useAppHistory()
  const utm: UTM = {
    utmSource: query.get('utm_source') ?? undefined,
    utmMedium: query.get('utm_medium') ?? undefined,
    utmCampaign: query.get('utm_campaign') ?? undefined,
    utmTerm: query.get('utm_term') ?? undefined,
    utmContent: query.get('utm_content') ?? undefined,
  }

  React.useEffect(() => {
    (async () => {
      // Load analytics once and only once
      const result = await client.fetchAnalytics(oid)
      if(result.type === 'data') {
        setAnalytics(result.data)
        initializeAnalytics(result.data)
      }
    })()
  }, [oid, setAnalytics])

  const utmMemo = useDeepMemoize(utm)

  React.useEffect(() => {
    conservativeUpdateUserData(utmMemo)
  }, [conservativeUpdateUserData, utmMemo])

  return <></>
}
