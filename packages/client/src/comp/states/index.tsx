import React from 'react'
import { useParams } from 'react-router-dom'

import { Florida } from './Florida'
import { BareLocale } from '../../lib/type'


export const StateForm = () => {
  const locale = useParams<BareLocale>()
  if (locale.state === 'Florida') {
    return <Florida locale={locale}/>
  } else if (locale.state) {
    return <p>You live in {locale.county}, {locale.state}.  This is coming soon for {locale.state}!</p>
  } else {
    return null
  }
}
