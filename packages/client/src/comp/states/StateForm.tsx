import React from 'react'
import { useParams, Switch, Route } from "react-router-dom"

import { Florida } from './Florida'
import { Michigan } from './Michigan'
import { AddressContainer, ContactContainer } from '../../lib/state'
import { Address, toLocale, vbmStatus, Locale, FloridaContact, Contact, MichiganContact } from '../../common'
import { Excuse, NoExcuse, Automatic, Website, Mail, VbmApp } from './Status'

const StateVbmApp: React.FC<{locale: Locale, contact: Contact | null}> = ({
  locale,
  contact
}) => {
  if (!contact) return null
  if (contact.state !== locale.state) throw Error(`States ${contact.state} and ${locale.state} do not match`)

  switch (locale.state) {
    case 'Florida': return <Florida locale={locale as Locale<'Florida'>} contact={contact as FloridaContact}/>
    case 'Michigan': return <Michigan locale={locale as Locale<'Michigan'>} contact={contact as MichiganContact}/>
    default: throw Error('Unrecognized VBM State')
  }
}

const useLocale = (): Locale | null => {
  const { address } = AddressContainer.useContainer()
  const params = useParams<Locale>() as Address
  return toLocale({...address, ...params})
}

const StateChooser = () => {
  // must call all hooks first
  const locale = useLocale()
  const { contact } = ContactContainer.useContainer()

  if (!locale) return null

  const status = vbmStatus(locale.state)
  const arg = {...status, ...locale}

  switch(arg.status) {
    case "Excuse": return <Excuse {...arg}/>
    case "NoExcuse": return <NoExcuse {...arg}/>
    case "Automatic": return <Automatic {...arg}/>
    case "Website": return <Website {...arg}/>
    case "Mail": return <Mail {...arg}/>
    case "VbmApp": return <VbmApp {...arg}>
      <StateVbmApp locale={locale} contact={contact}/>
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
