import React from 'react'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'

import { RoundedButton } from '../util/Button'
import { floridaCounties } from '../../common/data/florida'
import { FloridaInfo, uspsAddressOneLine } from '../../common/index'
import { BareLocale } from '../../lib/type'
import { client } from '../../lib/trpc'
import { AddressContainer } from '../../lib/state'
import { useHistory } from 'react-router-dom'
import { createControlRef } from '../util/ControlRef'

export const Florida = ({locale}: {locale: BareLocale}) => {
  const history = useHistory()

  const nameRef = createControlRef<Input>()
  const birthdateRef = createControlRef<Input>()
  const emailRef = createControlRef<Input>()
  const phoneRef = createControlRef<Input>()

  const { county, state } = locale
  const { name, email, url } = floridaCounties[county]
  const { address } = AddressContainer.useContainer()
  const uspsAddress = address ? uspsAddressOneLine(address) : null

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.persist()  // allow async function call
    event.preventDefault()
    if (!address || !uspsAddress) return  // TODO: Add warning

    const info: FloridaInfo = {
      state: 'Florida',
      name: nameRef.value(),
      birthdate: birthdateRef.value(),
      email: emailRef.value(),
      addressId: address.id!,
      mailingAddress: '',
      phone: phoneRef.value(),
      uspsAddress,
      county,
    }
    const result = await client.register(info)
    if (result.type === 'data') {
      history.push(`/success#${result.data}`)
    }
    // TODO: Add warning if error
  }

  return <Form onSubmit={handleSubmit}>
    <h2>Great News!  You can Vote by Mail</h2>
    <p>Your address {uspsAddress} is in {county}, {state}.</p>
    <p>Your county elections official is {name} who can be reached at <a href='mailto:{email}'>{email}</a> (<a href={url}>County Elections Website</a>)</p>
    <p>To send a registration email, fill out the following form</p>
    <Input
      label='Name'
      type='text'
      floatingLabel={true}
      ref={nameRef}
      required
    />
    <Input
      label='Birthdate (mm/dd/yyyy)'
      type='date'
      ref={birthdateRef}
      required
    />
    <Input
      label='Email'
      type='email'
      floatingLabel={true}
      ref={emailRef}
      required
    />
    <Input
      label='Phone (Optional) 123-456-7890'
      type='tel'
      pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
      floatingLabel={true}
      ref={phoneRef}
    />
    <RoundedButton color='primary' variant='raised'>Receive my Registration email</RoundedButton>
  </Form>
}
