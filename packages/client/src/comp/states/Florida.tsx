import Checkbox from 'muicss/lib/react/checkbox';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import React, { PropsWithChildren } from 'react';
import { useHistory } from 'react-router-dom';
import { createContainer } from 'unstated-next';

import { floridaCounties } from '../../common/data/florida';
import { FloridaInfo, uspsAddressOneLine } from '../../common/index';
import { AddressContainer } from '../../lib/state';
import { client } from '../../lib/trpc';
import { BareLocale } from '../../lib/type';
import { RoundedButton } from '../util/Button';
import { useControlRef } from '../util/ControlRef';

const useCheckbox = (init = false) => {
  const [checked, setCheck] = React.useState<boolean>(init)
  const toggleCheck = () => setCheck(!checked)
  return { checked, toggleCheck }
}
const CheckboxContainer = createContainer(useCheckbox)

type Props = PropsWithChildren<{locale: BareLocale}>

const RawFlorida = ({locale}: Props) => {
  const history = useHistory()

  const nameRef = useControlRef<Input>()
  const birthdateRef = useControlRef<Input>()
  const emailRef = useControlRef<Input>()
  const phoneRef = useControlRef<Input>()
  const mailingRef = useControlRef<Input>()

  const { checked, toggleCheck } = CheckboxContainer.useContainer()

  const { county } = locale
  const { name, email, url } = floridaCounties[county]
  const { address } = AddressContainer.useContainer()
  const uspsAddress = address ? uspsAddressOneLine(address) : null

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.persist()  // allow async function call
    event.preventDefault()
    if (!address || !uspsAddress) return  // TODO: Add warning

    const info: FloridaInfo = {
      state: 'Florida',
      name: nameRef.value(),
      birthdate: birthdateRef.value(),
      email: emailRef.value(),
      addressId: address.id || '',
      mailingAddress: checked ? mailingRef.value() : undefined,
      phone: phoneRef.value(),
      uspsAddress,
      county,
    }
    const result = await client.register(info)
    if (result.type === 'data') {
      history.push(`/success#${result.data}`)
    }
    // TODO: Add warning if error
  }

  return <Form onSubmit={handleSubmit}>
    <p>
      Your county elections official is {name} and can be reached at <a href='mailto:{email}'>{email}</a>
      For more information, visit the (<a href={url}>County Elections Website</a>).
    </p>
    <p>To apply, fill out the following form and we will send the vote-by-mail application email to both you and the county official:</p>
    <Input
      id='name'
      label='Name'
      type='text'
      floatingLabel={true}
      ref={nameRef}
      required
    />
    <Input
      id='birthdate'
      label='Birthdate (mm/dd/yyyy)'
      type='date'
      ref={birthdateRef}
      required
    />
    <Input
      id='email'
      label='Email'
      type='email'
      floatingLabel={true}
      ref={emailRef}
      required
    />
    <Input
      id='tel'
      label='Phone (Optional) 123-456-7890'
      type='tel'
      pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
      floatingLabel={true}
      ref={phoneRef}
    />
    <Checkbox
      id='separate'
      label='Separate Mailing Address'
      checked={checked}
      onChange={toggleCheck}
    />
    {(
      checked
    ) ? (
      <Input
        id='mailing'
        label='Mailing Address'
        floatingLabel={true}
        ref={mailingRef}
        required={checked}
      />
    ) : (
      null
    )}
    <RoundedButton color='primary' variant='raised' data-testid='florida-submit'>
      Send my application email
    </RoundedButton>
  </Form>
}

export const Florida = (props: Props) => (
  <CheckboxContainer.Provider>
    <RawFlorida {...props}/>
  </CheckboxContainer.Provider>
)
