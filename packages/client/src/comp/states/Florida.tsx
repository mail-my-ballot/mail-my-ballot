import React from 'react'
import Form from 'muicss/lib/react/form'

import { SubmitButton } from '../util/Button'
import { MyInput } from '../util/Input'
import { floridaCounties } from '../../common/data/florida'
import { FloridaInfo, toUspsAddress } from '../../common/index'
import { BareLocale } from '../../lib/type'
import { client } from '../../lib/trpc'
import { AddressContainer } from '../../lib/state'

export const Florida = ({locale}: {locale: BareLocale}) => {
  const { county, state } = locale
  const { name, email, url } = floridaCounties[county]
  const { address } = AddressContainer.useContainer()
  let nameRef: HTMLInputElement | null
  let birthdateRef: HTMLInputElement | null
  let emailRef: HTMLInputElement | null

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.persist()  // allow async function call
    event.preventDefault()
    if (!address) return  // TODO: Add warning
    const uspsAddress = new Array(toUspsAddress(address)).join(', ')

    const info: FloridaInfo = {
      state: 'Florida',
      name: nameRef?.value!,
      birthdate: birthdateRef?.value!,
      email: emailRef?.value!,
      addressId: address.id!,
      uspsAddress,
    }
    const result = await client.register(info)
    if (result.type === 'data') {
      console.log(result.data)
    }
  }

  return <Form onSubmit={handleSubmit}>
    <h2>Great News!  You can Vote by Mail</h2>
    <p>You live in {county}, {state}.</p>
    <p>Your county elections official is {name} who can be reached at <a href='mailto:{email}'>{email}</a> (<a href={url}>County Elections Website</a>)</p>
    <p>To send a registration email, fill out the following form</p>
    <MyInput
      label='Name'
      type='text'
      floatingLabel={true}
      inputRef={el => nameRef = el}
      required
    />
    <MyInput
      label='Birthdate (mm/dd/yyyy)'
      type='date'
      inputRef={el => birthdateRef = el}
      required
    />
    <MyInput
      label='Email'
      type='email'
      floatingLabel={true}
      inputRef={el => emailRef = el}
      required
    />
    <SubmitButton color='primary' variant='raised'>Receive my Registration email</SubmitButton>
  </Form>
}
