import React from 'react'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'

import { osmGeocode } from '../lib/osm'
import { RawLocale } from '../common'
import { SubmitButton } from './util/Button'
import { client } from '../lib/trpc'

const defaultAddr = '301 N Olive Ave, West Palm Beach, FL 33401'

export const InitialForm: React.StatelessComponent = () => {
  let ref: any  // needs to be both `Input | null` and have undeclared value controlEl
  const [locale, setLocale] = React.useState<RawLocale | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.persist()  // allow async function call
    event.preventDefault()

    const inputAddr = ref.controlEl.value
    console.log(inputAddr)
    const locale = await osmGeocode(inputAddr)
    setLocale(locale)
    const result = await client.addLocale(locale)
    console.log(result)
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
