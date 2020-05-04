import React from 'react'

import { Florida } from './Florida'
import { Michigan } from './Michigan'
import { Georgia } from './Georgia'
import { Wisconsin } from './Wisconsin'
import { AddressContainer, ContactContainer } from '../../lib/state'
import { toLocale, Locale, Address, toContactMethod } from '../../common'
import styled from 'styled-components'
import { useAppHistory } from '../../lib/path'
import { InvalidContact, ContactInfo } from './ContactInfo'
import { Nebraska } from './Nebraska'

type Props = React.PropsWithChildren<{
  address: Address
  locale: Locale
}>

export const RawStateForm: React.FC<Props> = ({
  address,
  locale,
}) => {
  switch(locale.state) {
    case 'Florida': return <Florida address={address} locale={locale as Locale<'Florida'>} />
    case 'Michigan': return <Michigan address={address} locale={locale as Locale<'Michigan'>} />
    case 'Georgia': return <Georgia address={address} locale={locale as Locale<'Georgia'>} />
    case 'Wisconsin': return <Wisconsin address={address} locale={locale as Locale<'Wisconsin'>} />
    case 'Nebraska': return <Nebraska address={address} locale={locale as Locale<'Nebraska'>} />
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
  const method = toContactMethod(contact)

  if (!locale) throw Error(`Could not derive locale from Address`)
  if (!contact || !method) {
    return <InvalidContact locale={locale} contact={contact}/>
  }

  if (address.state !== contact.state) throw Error(`Address state ${address.state} does not match ${contact.state}`)
  if (locale.state !== contact.state) throw Error(`Locale state ${locale.state} does not match ${contact.state}`)

  return <PaddingTop>
    <h2>{address.state} Vote by Mail Form</h2>
    <ContactInfo locale={locale} contact={contact}/>
    <p>To apply, fill out the following form and we will send the vote-by-mail application email to both you and the local elections official:</p>
    <RawStateForm address={address} locale={locale}/>
  </PaddingTop>
}
