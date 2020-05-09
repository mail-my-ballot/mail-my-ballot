import React from 'react'

import { GeorgiaInfo } from '../../common'
import Input from 'muicss/lib/react/input'
import { useControlRef } from '../util/ControlRef'
import { SignatureBase, StatelessInfo, NoSignature } from './Base'

export const Georgia = () => {
  const partyRef = useControlRef<Input>()

  const enrichValues = (baseInfo: StatelessInfo): NoSignature<GeorgiaInfo> | null => {
    return {
      ...baseInfo,
      state: 'Georgia',
      party: 'Democratic', // partyRef.value() || ''
    }
  }

  return <SignatureBase<GeorgiaInfo> enrichValues={enrichValues}>
    <Input
      id='name'
      ref={partyRef}
      required
    />
  </SignatureBase>
}
