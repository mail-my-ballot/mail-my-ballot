import React from 'react'
import { useParams, Switch, Route } from "react-router-dom"

import { Florida } from './Florida'
import { BareLocale } from '../../lib/type'


const StateFormChooser = () => {
  const locale = useParams<BareLocale>()
  if (locale.state === 'Florida') {
    return <Florida locale={locale}/>
  } else if (locale.state) {
    return <p>You live in {locale.county}, {locale.state}.  This is coming soon for {locale.state}!</p>
  } else {
    return null
  }
}

export const StateForm = () => (
  <Switch>
    <Route path={`/:state/:county`}>
      <StateFormChooser/>
    </Route>
  </Switch>
)
