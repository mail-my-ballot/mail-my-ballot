import React from 'react'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import SignatureCanvas from 'react-signature-canvas'

import { GeorgiaInfo, uspsAddressOneLine, Locale, Address } from '../../common'
import { client } from '../../lib/trpc'
import { RoundedButton } from '../util/Button'
import { useControlRef } from '../util/ControlRef'
import { Signature } from '../util/Signature'
import styled from 'styled-components'
import { PhoneInput, BaseInput, EmailInput, NameInput, BirthDateInput } from '../util/Input'
import { Togglable } from '../util/Togglable'
import { useAppHistory } from '../../lib/path'

const SigWrap = styled.div`
  margin: 2em 0;
`

type Props = React.PropsWithChildren<{
  address: Address
  locale: Locale<'Georgia'>
}>

export const Georgia = ({address, locale}: Props) => {
  const { pushSuccess, oid } = useAppHistory()

  const nameRef = useControlRef<Input>()
  const emailRef = useControlRef<Input>()
  const phoneRef = useControlRef<Input>()
  const birthdateRef = useControlRef<Input>()
  const mailingRef = useControlRef<Input>()
  const signatureRef = React.useRef<SignatureCanvas>(null)

  const { city, county } = locale
  const uspsAddress = address ? uspsAddressOneLine(address) : null

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.persist()  // allow async function call
    event.preventDefault()
    if (!address || !uspsAddress || !signatureRef.current) return  // TODO: Add warning

    // TODO: find a more elegant solution
    if (signatureRef.current.isEmpty()) {
      alert('Please sign form')
      return
    }

    const info: GeorgiaInfo = {
      state: 'Georgia',
      oid,
      name: nameRef.value() || '',
      uspsAddress,
      email: emailRef.value() || '',
      phone: phoneRef.value() || '',
      county,
      city,
      birthdate: birthdateRef.value() || '',
      mailingAddress: mailingRef.value() || undefined,
      signature: signatureRef.current.toDataURL(),
      electionType: 'General Election',
      electionDate: '11/03/2020'
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
    <SigWrap>
      <Signature inputRef={signatureRef} label='Signature (use your Mouse or Finger)'/>
    </SigWrap>

    <RoundedButton color='primary' type='submit' variant='raised' data-testid='michigan-submit'>
      Send my application email
    </RoundedButton>
  </Form>
}
