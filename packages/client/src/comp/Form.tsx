import React from 'react'
import Form from 'muicss/lib/react/form'

import { useHistory } from 'react-router-dom'

import { osmGeocode } from '../lib/osm'
import { MyInput } from './util/Input'
import { SubmitButton } from './util/Button'
import { client } from '../lib/trpc'
import { QueryContainer, AddressContainer } from '../lib/state'
import { StateForm } from './states/'

const defaultAddr = '301 N Olive Ave, West Palm Beach, FL 33401'

export const InitialForm: React.StatelessComponent = () => {
  let ref: HTMLInputElement | null
  const { setAddress } = AddressContainer.useContainer()
  const { startLoad, setError, clearError } = QueryContainer.useContainer()
  const history = useHistory()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.persist()  // allow async function call
    event.preventDefault()

    if (!ref) return

    const inputAddr = ref.value
    startLoad()
    const newLocale = await osmGeocode(inputAddr)
    setAddress(newLocale)
    if (newLocale) {
      clearError()
      const result = await client.addLocale(newLocale)
      if (result.type === 'data') {
        setAddress({...newLocale, id: result.data})
        console.log(newLocale)
        history.push(`/${newLocale.state}/${newLocale.county}`)
      }
    } else {
      setError(`No address found for "${inputAddr}"`)
    }
  }

  return <>
    <Form onSubmit={handleSubmit}>
      <legend>Address</legend>
      <MyInput
        label='Address'
        floatingLabel={true}
        inputRef={el => ref = el}
        defaultValue={defaultAddr}
      />
      <SubmitButton color='primary' variant='raised'>Can I vote by Mail?</SubmitButton>
    </Form>
    <StateForm />
  </>
}
