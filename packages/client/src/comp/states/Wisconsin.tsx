import React from 'react'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'

import { WisconsinInfo, uspsAddressOneLine, Locale, Address } from '../../common'
import { client } from '../../lib/trpc'
import { RoundedButton } from '../util/Button'
import { useControlRef } from '../util/ControlRef'
import { PhoneInput, BaseInput, EmailInput, NameInput, BirthDateInput } from '../util/Input'
import { Togglable } from '../util/Togglable'
import { useAppHistory } from '../../lib/path'

type Props = React.PropsWithChildren<{
  address: Address
  locale: Locale<'Wisconsin'>
}>

export const Wisconsin = ({address, locale}: Props) => {
  const { pushSuccess, oid } = useAppHistory()

  const nameRef = useControlRef<Input>()
  const emailRef = useControlRef<Input>()
  const phoneRef = useControlRef<Input>()
  const birthdateRef = useControlRef<Input>()
  const mailingRef = useControlRef<Input>()

  const { city, county } = locale
  const uspsAddress = address ? uspsAddressOneLine(address) : null

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.persist()  // allow async function call
    event.preventDefault()
    if (!address || !uspsAddress) return  // TODO: Add warning

    const info: WisconsinInfo = {
      state: 'Wisconsin',
      oid,
      name: nameRef.value() || '',
      uspsAddress,
      email: emailRef.value() || '',
      phone: phoneRef.value() || '',
      county,
      city,
      birthdate: birthdateRef.value() || '',
      mailingAddress: mailingRef.value() || undefined,
      ballotMethod: 'Mail',
    }
    const result = await client.register(info)
    result.type === 'data' && pushSuccess(result.data)
    // TODO: Add warning if error
  }

  return <Form onSubmit={handleSubmit}>
    <NameInput
      id='name'
      ref={nameRef}
      required
    />
    <BirthDateInput
      id='birthdate'
      ref={birthdateRef}
      required
    />
    <EmailInput
      id='email'
      ref={emailRef}
      required
    />
    <PhoneInput
      id='phone'
      ref={phoneRef}
      required
    />
    <Togglable
      id='separate'
      label='Mail My Ballot to a Separate Mailing Address'
    >{
      (checked) => <BaseInput
        id='mailing'
        label='Mailing Address'
        ref={mailingRef}
        required={checked}
      />
    }</Togglable>

    <RoundedButton color='primary' type='submit' variant='raised' data-testid='michigan-submit'>
      Send my application email
    </RoundedButton>
  </Form>
}
