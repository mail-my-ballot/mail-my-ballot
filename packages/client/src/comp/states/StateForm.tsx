import React from 'react'

import { Florida } from './Florida'
import { Michigan } from './Michigan'
import { AddressContainer, ContactContainer } from '../../lib/state'
import { toLocale, Locale, Address, Contact } from '../../common'
import styled from 'styled-components'
import { useAppHistory } from '../../lib/path'

type Props = React.PropsWithChildren<{
  address: Address
  locale: Locale
  contact: Contact
}>

export const RawStateForm: React.FC<Props> = ({
  address,
  locale,
  contact,
}) => {
  switch(contact.state) {
    case 'Florida': return <Florida address={address} locale={locale as Locale<'Florida'>} contact={contact}/>
    case 'Michigan': return <Michigan address={address} locale={locale as Locale<'Michigan'>} contact={contact}/>
  }
}

export const PaddingTop = styled.div`
  padding-top: 4em;
`

export const StateForm = () => {
  const { address } = AddressContainer.useContainer()
  const { contact } = ContactContainer.useContainer()
  const { path, pushAddress, pushStart } = useAppHistory()

  if (!address || !contact) {
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
  if (address.state !== contact.state) throw Error(`Address state ${address.state} does not match ${contact.state}`)
  if (locale.state !== contact.state) throw Error(`Locale state ${locale.state} does not match ${contact.state}`)

  return <PaddingTop>
    <h2>{address.state} Vote by Mail Form</h2>
    <RawStateForm address={address} locale={locale as Locale<'Florida'>} contact={contact}/>
  </PaddingTop>
}
