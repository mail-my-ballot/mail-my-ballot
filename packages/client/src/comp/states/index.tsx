import React from 'react'
import { Florida } from './Florida'
import { BareLocale } from '../../lib/type'

export const StateForm = ({locale}: {locale: BareLocale}) => {
  if (locale.state === 'Florida') {
    return <Florida locale={locale}/>
  } else {
    return <p>You live in {locale.county}, {locale.state}.  This is coming soon for {locale.state}!</p>
  }
}
