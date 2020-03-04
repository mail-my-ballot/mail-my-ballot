import React from 'react'
import { createContainer } from "unstated-next"
import { WithoutId, Locale } from '../common'

const Locale = createContainer(() => {
  const [locale, setLocale] = React.useState<WithoutId<Locale> | null>(null)
  return { locale, setLocale }
})
