import React from 'react'

import { Florida } from './Florida'
import { Michigan } from './Michigan'
import { Georgia } from './Georgia'
import { Wisconsin } from './Wisconsin'
import { AddressContainer, ContactContainer } from '../../lib/state'
import { toLocale, Locale, Address, ContactData, ContactMethod, toContactMethod } from '../../common'
import styled from 'styled-components'
import { useAppHistory } from '../../lib/path'
import { InvalidContact } from './ContactInfo'

type Props = React.PropsWithChildren<{
  address: Address
  locale: Locale
  contact: ContactData
  method: ContactMethod
}>

export const RawStateForm: React.FC<Props> = ({
  address,
  locale,
  contact,
}) => {
  switch(contact.state) {
    case 'Florida': return <Florida address={address} locale={locale as Locale<'Florida'>} contact={contact}/>
    case 'Michigan': return <Michigan address={address} locale={locale as Locale<'Michigan'>} contact={contact}/>
    case 'Georgia': return <Georgia address={address} locale={locale as Locale<'Georgia'>} contact={contact}/>
    case 'Wisconsin': return <Wisconsin address={address} locale={locale as Locale<'Wisconsin'>} contact={contact}/>
    default: return null
  }
}

export const PaddingTop = styled.div`
  padding-top: 4em;
`

export const StateForm = () => {
  const { address } = AddressContainer.useContainer()
  const { contact } = ContactContainer.useContainer()
  const { path, pushAddress, pushStart } = useAppHistory()

  if (!address) {
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

  const locale = toLocale(address)
  if (!locale) throw Error(`Could not derive locale from Address`)

  if (!contact) {
    return <InvalidContact locale={locale} contact={contact}/>
  }
  if (address.state !== contact.state) throw Error(`Address state ${address.state} does not match ${contact.state}`)
  if (locale.state !== contact.state) throw Error(`Locale state ${locale.state} does not match ${contact.state}`)

  const method = toContactMethod(contact)
  if (!method) {
    return <InvalidContact locale={locale} contact={contact}/>
  }

  return <PaddingTop>
    <h2>{address.state} Vote by Mail Form</h2>
    <RawStateForm address={address} locale={locale} contact={contact} method={method}/>
  </PaddingTop>
}
