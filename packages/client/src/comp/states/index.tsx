import React from 'react'
import { useParams, Switch, Route } from "react-router-dom"

import { Florida } from './Florida'
import { BareLocale } from '../../lib/type'
import { AddressContainer } from '../../lib/state'


const StateFormChooser = () => {
  const { address } = AddressContainer.useContainer()
  const locale = useParams<BareLocale>()
  const { state, county } = {...address, ...locale}
  if (state === 'Florida') {
    return <Florida locale={{ state, county }}/>
  } else if (state) {
    return <p>You live in {county}, {state}.  This is coming soon for {state}!</p>
  } else {
    return null
  }
}

export const StateForm = () => (
  <Switch>
    <Route path={`/:state/:county`}>
      <StateFormChooser/>
    </Route>
    <Route path='/'>
      <StateFormChooser/>
    </Route>
  </Switch>
)
