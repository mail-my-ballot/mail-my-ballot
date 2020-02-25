import React from 'react'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'
import Input from 'muicss/lib/react/input'

import styled from 'styled-components'

const SubmitButton = styled(Button)`
  border-radius: 2em;
`

export const InitialForm: React.StatelessComponent = () => {
  const zip = React.useRef()
  const addr = React.useRef()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

  }

  return <Form onSubmit={handleSubmit}>
    <legend>Address</legend>
    <Input label='Zipcode' floatingLabel={true}></Input>
    <Input label='Address' floatingLabel={true}></Input>
    <SubmitButton color='primary' variant='raised'>Submit</SubmitButton>
  </Form>
}
