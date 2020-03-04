import React from 'react'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'

import { osmGeocode } from '../lib/osm'
import { SubmitButton } from './util/Button'
import { client } from '../lib/trpc'
import { QueryContainer, LocaleContainer } from '../lib/state'

const defaultAddr = '301 N Olive Ave, West Palm Beach, FL 33401'

export const InitialForm: React.StatelessComponent = () => {
  let ref: any  // needs to be both `Input | null` and have undeclared value controlEl
  const { locale, setLocale } = LocaleContainer.useContainer()
  const { errMsg, startLoad, setError, clearError } = QueryContainer.useContainer()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.persist()  // allow async function call
    event.preventDefault()

    const inputAddr = ref.controlEl.value
    startLoad()
    const newLocale = await osmGeocode(inputAddr)
    setLocale(newLocale)
    if (newLocale) {
      clearError()
      const result = await client.addLocale(newLocale)
      if (result.type === 'data') {
        setLocale({...newLocale, id: result.data})
      }
    } else {
      setError(`No address found for "${inputAddr}"`)
    }
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
    {locale ?
      <p>You live in {locale.county}, {locale.state}.</p> :
      (errMsg ? <p>{errMsg}</p> : null)}
  </Form>
}
