import React from 'react'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'

import { SubmitButton } from '../util/Button'
import { floridaCounties } from '../../common/data/florida'
import { BareLocale } from '../../lib/type'

export const Florida = ({locale}: {locale: BareLocale}) => {
  const { county, state } = locale
  const { name, email } = floridaCounties[county]
  let ref: any  // eslint-disable-line @typescript-eslint/no-unused-vars

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.persist()  // allow async function call
    event.preventDefault()

  }

  return <Form onSubmit={handleSubmit}>
    <h2>Great News!  You can Vote by Mail</h2>
    <p>You live in {county}, {state}.
    Your county elections official is {name} and can be reached at {email}</p>
    <legend>Vote by Mail Florida Application</legend>
    <Input
      label='Email'
      floatingLabel={true}
      ref={el => ref = el}
    />
    <Input
      label='Email'
      floatingLabel={true}
      ref={el => ref = el}
    />
    <SubmitButton color='primary' variant='raised'>Submit</SubmitButton>
  </Form>
}
