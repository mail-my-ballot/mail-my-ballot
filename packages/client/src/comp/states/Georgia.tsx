import React from 'react'

import { GeorgiaInfo, isGeorgiaParty, georgiaParty } from '../../common'
import Input from 'muicss/lib/react/input'
import { useControlRef } from '../util/ControlRef'
import { SignatureBase, StatelessInfo, NoSignature } from './Base'

import Select from 'muicss/lib/react/select'
import Option from 'muicss/lib/react/option'

export const Georgia = () => {
  const partyRef = useControlRef<Input>()

  const enrichValues = (baseInfo: StatelessInfo): NoSignature<GeorgiaInfo> | null => {
    const party = partyRef.value()
    if (!isGeorgiaParty(party)) return null

    return {
      ...baseInfo,
      state: 'Georgia',
      party,
    }
  }

  return <SignatureBase<GeorgiaInfo> enrichValues={enrichValues}>
    <Select ref={partyRef} label='Party for Primary Ballot' defaultValue='Select' {...{required: true}}>
      <Option key={0} hidden={true}/>
      {[...georgiaParty].sort().map((value, key) => {
        return <Option value={value} key={key+1} label={value}/>
      })}
    </Select>
  </SignatureBase>
}
