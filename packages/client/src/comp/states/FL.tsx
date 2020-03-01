import React from 'react'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'

import { SubmitButton } from '../util/Button'
import { Signature } from '../util/Signature'

export const FL = () => {
  let ref: any  // eslint-disable-line @typescript-eslint/no-unused-vars

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.persist()  // allow async function call
    event.preventDefault()

  }

  return <Form onSubmit={handleSubmit}>
    <legend>Vote by Mail Florida Application</legend>
    <Input
      label='Email'
      floatingLabel={true}
      ref={el => ref = el}
    />
    <Signature/>
    <SubmitButton color='primary' variant='raised'>Submit</SubmitButton>
  </Form>
}
