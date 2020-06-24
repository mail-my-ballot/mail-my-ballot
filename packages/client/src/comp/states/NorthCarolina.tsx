import React from 'react'

import Select from 'muicss/lib/react/select'
import Option from 'muicss/lib/react/option'

import { NorthCarolinaInfo, northCarolinaIdentityType, isNorthCarolinaIdentity} from '../../common'
import { SignatureBase, StatelessInfo, NoSignature } from './Base'
import { useControlRef } from '../util/ControlRef'
import { BaseInput, DateInput } from '../util/Input'
import { Togglable } from '../util/Togglable'

export const NorthCarolina = () => {
  const idTypeRef = useControlRef<Select>()
  const idDataRef = useControlRef<Select>()
  const dateMovedRef = useControlRef<Select>()

  const enrichValues = (baseInfo: StatelessInfo): NoSignature<NorthCarolinaInfo> | null => {
    const idType  = idTypeRef.value()
    if (!isNorthCarolinaIdentity(idType)) return null

    const idData = idDataRef.value()
    if (!idData) return null

    const dateMoved = dateMovedRef.value() || undefined

    return {
      ...baseInfo,
      state: 'North Carolina',
      idType,
      idData,
      dateMoved,
    }
  }

  return <SignatureBase<NorthCarolinaInfo>enrichValues={enrichValues}>
    <p>North Carolina requires voters to confirm their identify using one of the following types of identification</p>
    <Select ref={idTypeRef} label='Identification Type' defaultValue='Select' {...{required: true}}>
      <Option key={0} hidden={true}/>
      {[...northCarolinaIdentityType].sort().map((value, key) => {
        return <Option value={value} key={key+1} label={value}/>
      })}
    </Select>
    <BaseInput
      id='identityData'
      ref={idDataRef}
      label='Identity Information'
      pattern='\d\d\d\d+'
      required={true}
    />
    <Togglable
      id='mailing'
      label='I have not lived at this address for more than 30 days'
    >{
      (checked) => <DateInput
        label='Date moved'
        ref={dateMovedRef}
        required={checked}
      />
    }</Togglable>
  </SignatureBase>
}