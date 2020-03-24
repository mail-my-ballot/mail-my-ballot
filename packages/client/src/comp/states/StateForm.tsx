import React from 'react'

import { Florida } from './Florida'
import { Michigan } from './Michigan'
import { AddressContainer, ContactContainer } from '../../lib/state'
import { toLocale, Locale } from '../../common'

export const StateForm = () => {
  const { address } = AddressContainer.useContainer()
  const { contact } = ContactContainer.useContainer()

  if (!address || !contact) throw Error('StateForm should only be called if address and contact are set')
  

  const locale = toLocale(address)
  if (!locale) throw Error(`Could not derive locale from Address`)

  if (address.state !== contact.state) throw Error(`Address state ${address.state} does not match ${contact.state}`)
  if (locale.state !== contact.state) throw Error(`Locale state ${locale.state} does not match ${contact.state}`)

  switch(contact.state) {
    case 'Florida': return <Florida address={address} locale={locale as Locale<'Florida'>} contact={contact}/>
    case 'Michigan': return <Michigan address={address} locale={locale as Locale<'Michigan'>} contact={contact}/>
  }
}
