import React from 'react'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'
import Input from 'muicss/lib/react/input'

import styled from 'styled-components'

const SubmitButton = styled(Button)`
  border-radius: 2em;
`

export const InitialForm: React.StatelessComponent = () => {
  let ref: any  // needs to be both `Input | null` and have undeclared value controlEl
  const [displayAddr, setAddr] = React.useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.persist()  // allow async function call
    event.preventDefault()

    const inputAddr = ref.controlEl.value
    console.log(inputAddr)
    const result = await fetch(`https://nominatim.openstreetmap.org/search/${inputAddr}?format=json&countrycodes=us`)
    const json = await result.json()
    setAddr(json[0].display_name)
  }

  return <Form onSubmit={handleSubmit}>
    <legend>Address</legend>
    <Input label='Address' floatingLabel={true} ref={el => ref = el} defaultValue='230 ashland pl, brooklyn ny'></Input>
    {displayAddr ? <p>{displayAddr}</p> : null}
    <SubmitButton color='primary' variant='raised'>Submit</SubmitButton>
  </Form>
}
