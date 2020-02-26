import React from 'react'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'
import Input from 'muicss/lib/react/input'

import styled from 'styled-components'

const SubmitButton = styled(Button)`
  border-radius: 2em;
`

export const InitialForm: React.StatelessComponent = () => {
  const addr = React.useRef<Input>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const addrStr = '230 ashland pl, brooklyn ny'

    fetch(`https://nominatim.openstreetmap.org/search/${addrStr}?format=json&countrycodes=us`)
      .then(
        res => res.json()
      ).then(
        json => console.log(json)
      )

    event.preventDefault()
  }

  return <Form onSubmit={handleSubmit}>
    <legend>Address</legend>
    <Input label='Address' floatingLabel={true} ref={addr} defaultValue='230 ashland pl, brooklyn ny'></Input>
    <SubmitButton color='primary' variant='raised'>Submit</SubmitButton>
  </Form>
}
