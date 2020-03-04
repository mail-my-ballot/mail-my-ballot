import React from 'react'
import { Florida } from './Florida'
import { Locale } from '../../common'

export const StateForm = ({locale}: {locale: Locale}) => {
  if (locale.state === 'Florida') {
    return <Florida locale={locale}/>
  } else {
    return <p>Coming soon for your state!</p>
  }
}
