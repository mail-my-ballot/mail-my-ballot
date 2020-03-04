import React from 'react'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'

import { SubmitButton } from '../util/Button'
import { floridaCounties } from '../../common/data/florida'
import { Locale } from '../../common'

export const Florida = ({locale}: {locale: Locale}) => {
  const { name, email } = floridaCounties[locale.county]
  let ref: any  // eslint-disable-line @typescript-eslint/no-unused-vars

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.persist()  // allow async function call
    event.preventDefault()

  }

  return <Form onSubmit={handleSubmit}>
    <p>You live in {locale.county}, {locale.state}.  Your county elections official is {name} and can be reached at {email}</p>
    <legend>Vote by Mail Florida Application</legend>
    <Input
      label='Email'
      floatingLabel={true}
      ref={el => ref = el}
    />
    <SubmitButton color='primary' variant='raised'>Submit</SubmitButton>
  </Form>
}
