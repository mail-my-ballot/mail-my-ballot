import React from 'react'

import { vbmStatus, isState } from '../../common'
import { Excuse, NoExcuse, Automatic, Website, Mail, VbmApp, Unidentified } from './Status'

export const StatusReport: React.FC<{state: string}> = ({state, children}) => {
  if (!isState(state)) {
    return <Unidentified state={state}/>
  }
  const status = vbmStatus(state)
  const args = {...status, state}

  switch(args.status) {
    case "Excuse": return <Excuse {...args}/>
    case "NoExcuse": return <NoExcuse {...args}/>
    case "Automatic": return <Automatic {...args}/>
    case "Website": return <Website {...args}/>
    case "Mail": return <Mail {...args}/>
    case "VbmApp": return <VbmApp {...args}>
      {children}
    </VbmApp>
  }
}
