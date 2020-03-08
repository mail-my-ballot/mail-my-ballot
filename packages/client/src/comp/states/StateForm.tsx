import React from 'react'
import { useParams, Switch, Route } from "react-router-dom"

import { Florida } from './Florida'
import { BareLocale } from '../../lib/type'
import { AddressContainer } from '../../lib/state'
import { isState, vbmStatus } from '../../common'
import { Excuse, NoExcuse, Automatic, Website, Mail, VbmApp } from './Status'

const StateVbmApp = ({state, county}: BareLocale) => {
  if (state === 'Florida') {
    return <Florida locale={{ state, county }}/>
  } else {
    throw Error('Unrecognized VBM State')
  }
}

const StateChooser = () => {
  const { address } = AddressContainer.useContainer()
  const locale = useParams<BareLocale>()
  const { state, county } = {...address, ...locale}

  if (!isState(state)) {
    return null
  }

  const vbm = vbmStatus(state)

  switch(vbm.status) {
    case "Excuse": return <Excuse state={state}/>
    case "NoExcuse": return <NoExcuse state={state}/>
    case "Automatic": return <Automatic state={state}/>
    case "Website": return <Website
      state={state}
      regUrl={vbm.regUrl}
      infoUrl={vbm.infoUrl}
    />
    case "Mail": return <Mail
      state={state}
      infoUrl={vbm.infoUrl}
    />
    case "VbmApp": return <VbmApp state={state}>
      <StateVbmApp state={state} county={county}/>
    </VbmApp>
  }
}

export const StateForm = () => (
  <Switch>
    <Route path={`/:state/:county`}>
      <StateChooser/>
    </Route>
    <Route path='/'>
      <StateChooser/>
    </Route>
  </Switch>
)
