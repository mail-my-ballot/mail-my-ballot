import React from 'react'

import Select from 'muicss/lib/react/select'
import Option from 'muicss/lib/react/option'

import { NewHampshireInfo, isNewHampshirePrimaryParty, newHampshirePrimaryParty } from '../../common'
import { SignatureBase } from './Base'
import { useControlRef } from '../util/ControlRef'

export const NewHampshire = () => {
  const primaryPartyRef = useControlRef<Select>()

  return <SignatureBase<NewHampshireInfo>
    enrichValues={(info) => {
      const primaryParty = primaryPartyRef.value()
      if (!isNewHampshirePrimaryParty(primaryParty)) return null

      return {
        ...info,
        state: 'New Hampshire',
        primaryParty,
      }
    }}
  >
    <Select ref={primaryPartyRef} label='Primary Party' defaultValue='Select' {...{required: true}}>
      <Option key={0} hidden={true}/>
      {[...newHampshirePrimaryParty].sort().map((value, key) => {
        return <Option value={value} key={key+1} label={value}/>
      })}
    </Select>
  </SignatureBase>
}
