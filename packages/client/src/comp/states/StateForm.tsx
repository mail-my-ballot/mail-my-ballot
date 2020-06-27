import React from 'react'

import { Arizona } from './Arizona'
import { Florida } from './Florida'
import { Georgia } from './Georgia'
import { Maine } from './Maine'
import { Maryland } from './Maryland'
import { Michigan } from './Michigan'
import { Minnesota } from './Minnesota'
import { Nebraska } from './Nebraska'
import { Nevada } from './Nevada'
import { NewHampshire } from './NewHampshire'
import { NewYork } from './NewYork'
import { NorthCarolina } from './NorthCarolina'
import { Oklahoma } from './Oklahoma'
import { Wisconsin } from './Wisconsin'
import { Wyoming } from './Wyoming'
import { AddressContainer, ContactContainer } from '../../lib/unstated'
import { Locale, isImplementedLocale, ContactMethod, ImplementedState } from '../../common'
import { useAppHistory } from '../../lib/path'
import { InvalidContact } from '../contact/InvalidContact'
import { StyledPanel } from '../util/Panel'


type SwitchProps = React.PropsWithChildren<{
  locale: Locale<ImplementedState>
}>

const StateFormSwitch: React.FC<SwitchProps> = ({
  locale,
}) => {
  switch(locale.state) {
    case 'Arizona': return <Arizona />
    case 'Florida': return <Florida />
    case 'Georgia': return <Georgia />
    case 'Maine': return <Maine />
    case 'Maryland': return <Maryland />
    case 'Minnesota': return <Minnesota />
    case 'Michigan': return <Michigan />
    case 'Nebraska': return <Nebraska />
    case 'Nevada': return <Nevada />
    case 'New Hampshire': return <NewHampshire />
    case 'New York': return <NewYork />
    case 'North Carolina': return <NorthCarolina />
    case 'Oklahoma': return <Oklahoma />
    case 'Wisconsin': return <Wisconsin />
    case 'Wyoming': return <Wyoming />
  }
}

const methodExplain = (method: ContactMethod): string => {
  const email = 'email the vote-by-mail application to both you and the election official'
  const fax = 'fax the vote-by-mail application to the election official and email you a copy'
  switch(method.stateMethod) {
    case 'email': return email
    case 'fax': return fax
    case 'fax-email': return (method.emails.length > 0) ? email : fax
  }
}

interface Props {
  ignoreError?: boolean
}

export const StateForm: React.FC<Props> = ({ignoreError}) => {
  const { address, locale } = AddressContainer.useContainer()
  const { contact, method } = ContactContainer.useContainer()
  const { path, pushAddress, pushStartSection } = useAppHistory()

  // if we do not have locale or address data, go back
  if (!locale || !address) {
    if (ignoreError) return null
    if (!path) {
      pushStartSection('start')
    } else if (path.type === 'state') {
      pushAddress(path.state)
    } else {
      pushStartSection('start')
    }
    return null
  }

  // if we do not have contact or method data, we just cannot find a contact
  if (!contact || !method) {
    if (ignoreError) return null
    return <InvalidContact locale={locale} contact={contact}/>
  }

  // unlikely cases, caught mostly for type checking
  if (locale.state !== contact.state) {
    if (ignoreError) return null
    throw Error(`Locale state ${locale.state} does not match ${contact.state}`)
  }
  if (!isImplementedLocale(locale)) {
    if (ignoreError) return null
    throw Error(`Locale state ${locale.state} is not implemented`)
  }

  return <>
    <h1>{locale.state} Vote by Mail Form</h1>
    <p><b>Fill out</b> the following form and we will {methodExplain(method)}</p>
    <StyledPanel>
      <StateFormSwitch locale={locale}/>
    </StyledPanel>
  </>
}
