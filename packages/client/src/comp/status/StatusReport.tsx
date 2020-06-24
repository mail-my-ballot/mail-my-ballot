import React from 'react'

import { vbmStatus, State } from '../../common'
import { Automatic, Website, Mail, VbmApp, VoteDotOrg } from './Status'
import { useAppHistory } from '../../lib/path'

export const StatusReport: React.FC<{state: State}> = ({state, children}) => {
  const { path } = useAppHistory()
  const zip = (path?.type === 'address') ? path.zip : undefined

  const status = vbmStatus(state)
  const args = {...status, state, zip}

  switch(args.status) {
    case "Automatic": return <Automatic {...args}/>
    case "Website": return <Website {...args}/>
    case "Mail": return <Mail {...args}/>
    case "Vote.org" : return <VoteDotOrg {...args}/>
    case "VbmApp": return <VbmApp {...args}>
      {children}
    </VbmApp>
  }
}
