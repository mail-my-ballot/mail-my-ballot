import React from 'react'

import { Address, Locale, GeorgiaInfo } from '../../common'
import Input from 'muicss/lib/react/input'
import { useControlRef } from '../util/ControlRef'
import { SignatureBase, StatelessInfo, NoSignature } from './Base'

type Props = React.PropsWithChildren<{
  address: Address
  locale: Locale<'Georgia'>
}>

export const Georgia = ({address, locale}: Props) => {
  const partyRef = useControlRef<Input>()

  const enrichValues = (baseInfo: StatelessInfo): NoSignature<GeorgiaInfo> | null => {
    return {
      ...baseInfo,
      state: 'Georgia',
      party: 'Democratic', // partyRef.value() || ''
    }
  }

  return <SignatureBase<GeorgiaInfo> address={address} locale={locale} enrichValues={enrichValues}>
    <Input
      id='name'
      ref={partyRef}
      required
    />
  </SignatureBase>
}
