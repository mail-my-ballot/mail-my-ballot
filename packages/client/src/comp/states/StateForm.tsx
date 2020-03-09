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

  const status = vbmStatus(state)
  const arg = {...status, state, county}

  switch(arg.status) {
    case "Excuse": return <Excuse {...arg}/>
    case "NoExcuse": return <NoExcuse {...arg}/>
    case "Automatic": return <Automatic {...arg}/>
    case "Website": return <Website {...arg}/>
    case "Mail": return <Mail {...arg}/>
    case "VbmApp": return <VbmApp {...arg}>
      <StateVbmApp {...arg}/>
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
