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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const inputAddr = ref.controlEl.value
    console.log(inputAddr)
    fetch(`https://nominatim.openstreetmap.org/search/${inputAddr}?format=json&countrycodes=us`)
      .then(
        res => res.json()
      ).then(
        json => {
          console.log(json[0].display_name)
          setAddr(json[0].display_name)
        }
      )

    event.preventDefault()
  }

  return <Form onSubmit={handleSubmit}>
    <legend>Address</legend>
    <Input label='Address' floatingLabel={true} ref={el => ref = el} ></Input>
    {displayAddr ? <p>{displayAddr}</p> : null}
    <SubmitButton color='primary' variant='raised'>Submit</SubmitButton>
  </Form>
}
