import React from 'react'
import SignatureCanvas from 'react-signature-canvas'

import { Address, Locale, GeorgiaInfo } from '../../common'
import Input from 'muicss/lib/react/input'
import { useControlRef } from '../util/ControlRef'
import { Base, StatelessInfo } from './Base'
import { Signature } from '../util/Signature'

type Props = React.PropsWithChildren<{
  address: Address
  locale: Locale<'Georgia'>
}>

export const Georgia = ({address, locale}: Props) => {
  const partyRef = useControlRef<Input>()
  const signatureRef = React.useRef<SignatureCanvas>(null)

  const enrichValues = (baseInfo: StatelessInfo): GeorgiaInfo | null => {
    if (!signatureRef.current || signatureRef.current.isEmpty()) {
      alert('Please sign form')
      return null
    }

    return {
      ...baseInfo,
      state: 'Georgia',
      party: 'Democratic', // partyRef.value() || ''
      signature: signatureRef.current.toDataURL()
    }
  }

  return <Base<GeorgiaInfo> address={address} locale={locale} enrichValues={enrichValues}>
    <Input
      id='name'
      ref={partyRef}
      required
    />
    <Signature inputRef={signatureRef} label='Signature (use your Mouse or Finger)'/>
  </Base>
}
