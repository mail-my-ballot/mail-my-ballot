import React from 'react'

import { vbmStatus, isState } from '../../common'
import { Automatic, Website, Mail, VbmApp, VoteDotOrg, Unidentified } from './Status'
import { useAppHistory } from '../../lib/path'

export const StatusReport: React.FC<{state: string}> = ({state, children}) => {
  const { path } = useAppHistory()
  const zip = (path?.type === 'address') ? path.zip : undefined

  if (!isState(state)) {
    return <Unidentified state={state}/>
  }
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
