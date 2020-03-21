import React, { PropsWithChildren } from 'react'
import Checkbox from 'muicss/lib/react/checkbox'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import SignatureCanvas from 'react-signature-canvas'
import { useHistory } from 'react-router-dom'

import { MichiganInfo, uspsAddressOneLine, Locale, MichiganContact } from '../../common'
import { AddressContainer } from '../../lib/state'
import { client } from '../../lib/trpc'
import { RoundedButton } from '../util/Button'
import { useControlRef } from '../util/ControlRef'
import { Signature } from '../util/Signature'
import styled from 'styled-components'
import { PhoneInput, BaseInput, EmailInput, NameInput, BirthYearInput } from '../util/Input'
import { togglableInput } from '../util/Togglable'

const SigWrap = styled.div`
  margin: 2em 0;
`

type Props = PropsWithChildren<{
  locale: Locale<'Michigan'>
  contact: MichiganContact
}>

const TogglableInput = togglableInput(BaseInput)

export const Michigan = ({locale, contact}: Props) => {
  const history = useHistory()

  const nameRef = useControlRef<Input>()
  const emailRef = useControlRef<Input>()
  const phoneRef = useControlRef<Input>()
  const birthyearRef = useControlRef<Input>()
  const mailingRef = useControlRef<Input>()
  const signatureRef = React.useRef<SignatureCanvas>(null)

  const { city, county } = locale
  const { address } = AddressContainer.useContainer()
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

    const info: MichiganInfo = {
      addressId: address.id || '',
      state: 'Michigan',
      name: nameRef.value(),
      uspsAddress,
      email: emailRef.value(),
      phone: phoneRef.value(),
      county,
      city,
      birthyear: birthyearRef.value(),
      mailingAddress: mailingRef.value() || undefined,
      signature: signatureRef.current.toDataURL()
    }
    const result = await client.register(info)
    if (result.type === 'data') {
      history.push(`/success#${result.data}`)
    }
    // TODO: Add warning if error
  }

  if (!contact || !contact.email) {
    return <p>
      The local elections official for {city} is {contact.clerk};
      Unfortunately, they are one of the few that do not list an email on the
        <a href='https://mvic.sos.state.mi.us/'>Michigan Secretary of State&apos;s Website</a>.&nbsp;
      {contact.phone && <>Their phone number is {contact.phone}.&nbsp;</>}
      {contact.fax && <>Their phone number is {contact.fax}.&nbsp;</>}
    </p>
  }

  return <Form onSubmit={handleSubmit}>
    <p>
      The local elections official for {contact.city} is {contact.clerk} and can be reached at <a href={`mailto:{contact.email}`}>{contact.email}</a>.&nbsp;
      {contact.phone && <>Their phone number is {contact.phone}.&nbsp;</>}
      {contact.fax && <>Their phone number is {contact.fax}.&nbsp;</>}
    </p>
    <p>To apply, fill out the following form and we will send the vote-by-mail application email to both you and the local elections official:</p>
    <NameInput
      id='name'
      ref={nameRef}
      required
    />
    <BirthYearInput
      id='birthyear'
      ref={birthyearRef}
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
    <TogglableInput
      toggle={{
        id: 'separate',
        label: 'Mail my Ballot to a Separate Mailing'
      }}
      id='mailing'
      label='Mailing Address'
      ref={mailingRef}

      />
    <SigWrap>
      <Signature inputRef={signatureRef} label='Signature (use your Mouse or Finger)'/>
    </SigWrap>

    <RoundedButton color='primary' type='submit' variant='raised' data-testid='michigan-submit'>
      Send my application email
    </RoundedButton>
  </Form>
}
