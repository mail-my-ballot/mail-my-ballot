import React from 'react'

import { Florida } from './Florida'
import { Michigan } from './Michigan'
import { Georgia } from './Georgia'
import { Wisconsin } from './Wisconsin'

import { Maryland } from './Maryland'
import { Maine } from './Maine'
import { Nevada } from './Nevada'
import { AddressContainer, ContactContainer } from '../../lib/unstated'
import { Locale, ContactMethod } from '../../common'
import styled from 'styled-components'
import { useAppHistory } from '../../lib/path'
import { InvalidContact, ContactInfo } from './ContactInfo'
import { Nebraska } from './Nebraska'

type Props = React.PropsWithChildren<{
  locale: Locale
}>

export const RawStateForm: React.FC<Props> = ({
  locale,
}) => {
  switch(locale.state) {
    case 'Florida': return <Florida />
    case 'Michigan': return <Michigan />
    case 'Georgia': return <Georgia />
    case 'Wisconsin': return <Wisconsin />
    case 'Nebraska': return <Nebraska />
    case 'Maryland': return <Maryland />
    case 'Maine': return <Maine />
    case 'Nevada': return <Nevada />
    default: return null
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

  if (!locale) {
    if(!path) {
      pushStart()
      return null
    }
    switch (path.type) {
      case 'state': {
        pushAddress(path.state)
        return null
      }
      default: {
        pushStart()
        return null
      }
    }
  }

  if (!locale) throw Error(`Could not derive locale from Address`)
  if (!address) throw Error(`Could not find Address`)
  if (!contact || !method) {
    return <InvalidContact locale={locale} contact={contact}/>
  }

  if (locale.state !== contact.state) throw Error(`Locale state ${locale.state} does not match ${contact.state}`)

  return <PaddingTop>
    <h2>{locale.state} Vote by Mail Form</h2>
    <ContactInfo locale={locale} contact={contact}/>
    <p>To apply, fill out the following form and we will {methodExplain(method)}</p>
    <RawStateForm locale={locale}/>
  </PaddingTop>
}
