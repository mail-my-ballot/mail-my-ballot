import React from 'react'
import Form from 'muicss/lib/react/form'

import { SubmitButton } from '../util/Button'
import { MyInput } from '../util/Input'
import { floridaCounties } from '../../common/data/florida'
import { BareLocale } from '../../lib/type'

export const Florida = ({locale}: {locale: BareLocale}) => {
  const { county, state } = locale
  const { name, email, url } = floridaCounties[county]
  let nameInput: HTMLInputElement | null
  let birthdateInput: HTMLInputElement | null
  let emailInput: HTMLInputElement | null

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.persist()  // allow async function call
    event.preventDefault()
    console.log('hi')
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
      inputRef={el => nameInput = el}
      required
    />
    <MyInput
      label='Birthdate (mm/dd/yyyy)'
      type='date'
      inputRef={el => birthdateInput = el}
      required
    />
    <MyInput
      label='Email'
      type='email'
      floatingLabel={true}
      inputRef={el => emailInput = el}
      required
    />
    <SubmitButton color='primary' variant='raised'>Receive my Registration email</SubmitButton>
  </Form>
}
