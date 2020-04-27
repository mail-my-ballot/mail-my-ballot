import React from 'react'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'

import { FloridaInfo, uspsAddressOneLine, Locale, Address, ContactData } from '../../common'
import { client } from '../../lib/trpc'
import { RoundedButton } from '../util/Button'
import { useControlRef } from '../util/ControlRef'
import { BaseInput, PhoneInput, EmailInput, NameInput, BirthDateInput } from '../util/Input'
import { Togglable } from '../util/Togglable'
import { useAppHistory } from '../../lib/path'
import { ContactInfo } from './ContactInfo'

type Props = React.PropsWithChildren<{
  address: Address
  locale: Locale<'Florida'>
  contact: ContactData
}>

export const Florida = ({address, locale, contact}: Props) => {
  const { pushSuccess, oid } = useAppHistory()

  const nameRef = useControlRef<Input>()
  const birthdateRef = useControlRef<Input>()
  const emailRef = useControlRef<Input>()
  const phoneRef = useControlRef<Input>()
  const mailingRef = useControlRef<Input>()

  const uspsAddress = address ? uspsAddressOneLine(address) : null
  const { city, county } = locale

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.persist()  // allow async function call
    event.preventDefault()
    if (!address || !uspsAddress) return  // TODO: Add warning

    const info: FloridaInfo = {
      state: 'Florida',
      oid,
      name: nameRef.value() || '',
      birthdate: birthdateRef.value() || '',
      email: emailRef.value() || '',
      mailingAddress: mailingRef.value() || '',
      phone: phoneRef.value() || '',
      uspsAddress,
      city,
      county,
    }
    const result = await client.register(info)
    result.type === 'data' && pushSuccess(result.data)
    // TODO: Add warning if error
  }

  return <Form onSubmit={handleSubmit}>
    <ContactInfo locale={locale} contact={contact} />
    <p>To apply, fill out the following form and we will send the vote-by-mail application email to both you and the local elections official:</p>
    <NameInput
      id='name'
      ref={nameRef}
      required
    />
    <BirthDateInput
      id='birthdate'
      ref={birthdateRef}
      required
    />
    <EmailInput
      id='email'
      ref={emailRef}
      required
    />
    <PhoneInput
      id='tel'
      ref={phoneRef}
    />
    <Togglable
      id='separate'
      label='Mail My Ballot to a Separate Mailing Address'
    >{
      (checked) => <BaseInput
        id='mailing'
        label='Mailing Address'
        ref={mailingRef}
        required={checked}
      />
    }</Togglable>
    <RoundedButton color='primary' variant='raised' data-testid='florida-submit'>
      Send my application email
    </RoundedButton>
  </Form>
}
