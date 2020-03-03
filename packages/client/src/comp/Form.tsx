import React from 'react'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'

import { osmGeocode } from '../lib/osm'
import { Locale } from '../lib/types'
import { SubmitButton } from './util/Button'


const defaultAddr = '301 N Olive Ave, West Palm Beach, FL 33401'

export const InitialForm: React.StatelessComponent = () => {
  let ref: any  // needs to be both `Input | null` and have undeclared value controlEl
  const [locale, setLocale] = React.useState<Locale | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.persist()  // allow async function call
    event.preventDefault()

    const inputAddr = ref.controlEl.value
    console.log(inputAddr)
    const results = await osmGeocode(inputAddr)
    console.log(results)
    setLocale(results)
  }

  return <Form onSubmit={handleSubmit}>
    <legend>Address</legend>
    <Input
      label='Address'
      floatingLabel={true}
      ref={el => ref = el}
      defaultValue={defaultAddr}
    />
    <SubmitButton color='primary' variant='raised'>Can I vote by Mail?</SubmitButton>
    {locale ? <p>You live in {locale.county}, {locale.state}.</p> : null}
  </Form>
}