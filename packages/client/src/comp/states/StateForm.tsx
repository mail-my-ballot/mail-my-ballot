import React from 'react'

import { Florida } from './Florida'
import { Michigan } from './Michigan'
import { Georgia } from './Georgia'
import { Wisconsin } from './Wisconsin'

import { Maryland } from './Maryland'
import { Maine } from './Maine'
import { Nevada } from './Nevada'
import { AddressContainer, ContactContainer } from '../../lib/unstated'
import { Locale, ContactMethod, ImplementedState, isImplementedLocale } from '../../common'
import styled from 'styled-components'
import { useAppHistory } from '../../lib/path'
import { InvalidContact, ContactInfo } from './ContactInfo'
import { Nebraska } from './Nebraska'
import { Arizona } from './Arizona'
import { NewYork } from './NewYork'

type Props = React.PropsWithChildren<{
  locale: Locale<ImplementedState>
}>

export const RawStateForm: React.FC<Props> = ({
  locale,
}) => {
  switch(locale.state) {
    case 'Arizona': return <Arizona />
    case 'Florida': return <Florida />
    case 'Georgia': return <Georgia />
    case 'Maine': return <Maine />
    case 'Maryland': return <Maryland />
    case 'Michigan': return <Michigan />
    case 'Nebraska': return <Nebraska />
    case 'Nevada': return <Nevada />
    case 'New York': return <NewYork />
    case 'Wisconsin': return <Wisconsin />
  }
}

export const PaddingTop = styled.div`
  padding-top: 4em;
`

const methodExplain = (method: ContactMethod): string => {
  const email = 'email the vote-by-mail application to both you and the election official'
  const fax = 'fax the vote-by-mail application to the election official and email you a copy'
  switch(method.stateMethod) {
    case 'email': return email
    case 'fax': return fax
    case 'fax-email': return (method.emails.length > 0) ? email : fax
  }
}

export const StateForm = () => {
  const { address, locale } = AddressContainer.useContainer()
  const { contact, method } = ContactContainer.useContainer()
  const { path, pushAddress, pushStart } = useAppHistory()

  // if we do not have locale or address data, go back
  if (!locale || !address) {
    if (!path) {
      pushStart()
      return null
    } else if (path.type === 'state') {
      pushAddress(path.state)
      return null
    } else {
      pushStart()
      return null
    }
  }

  // if we do not have contact or method data, we just cannot find a contact
  if (!contact || !method) {
    return <InvalidContact locale={locale} contact={contact}/>
  }

  // unlikely cases, caught mostly for type checking
  if (locale.state !== contact.state) throw Error(`Locale state ${locale.state} does not match ${contact.state}`)
  if (!isImplementedLocale(locale)) throw Error(`Locale state ${locale.state} is not implemented`)

  return <PaddingTop>
    <h2>{locale.state} Vote by Mail Form</h2>
    <ContactInfo locale={locale} contact={contact}/>
    <p>To apply, fill out the following form and we will {methodExplain(method)}</p>
    <RawStateForm locale={locale}/>
  </PaddingTop>
}
