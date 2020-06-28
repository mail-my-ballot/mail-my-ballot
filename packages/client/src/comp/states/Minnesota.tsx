import React from 'react'

import Select from 'muicss/lib/react/select'
import Option from 'muicss/lib/react/option'

import { MinnesotaInfo, minnesotaIdentityType, isMinnesotaIdentity} from '../../common'
import { SignatureBase, StatelessInfo, NoSignature } from './Base'
import { useControlRef } from '../util/ControlRef'
import { BaseInput } from '../util/Input'

export const Minnesota = () => {
  const idTypeRef = useControlRef<Select>()
  const idDataRef = useControlRef<Select>()

  const enrichValues = (baseInfo: StatelessInfo): NoSignature<MinnesotaInfo> | null => {
    const idType  = idTypeRef.value()
    if (!isMinnesotaIdentity(idType)) return null

    const idData = idDataRef.value()
    if (!idData) return null

    return {
      ...baseInfo,
      state: 'Minnesota',
      idType,
      idData,
    }
  }

  return <SignatureBase<MinnesotaInfo>enrichValues={enrichValues}>
    <p>Minnesota requires voters to confirm their identify using one of the following types of identification</p>
    <Select ref={idTypeRef} label='Identification Type' defaultValue='Select' {...{required: true}}>
      <Option key={0} hidden={true}/>
      {[...minnesotaIdentityType].sort().map((value, key) => {
        return <Option value={value} key={key+1} label={value}/>
      })}
    </Select>
    <p>Enter the relevant information based on your choice above.  If &apos;None&apos; 
      please confirm by typing &apos;None&apos;:
    </p>
    <BaseInput
      id='identityData'
      ref={idDataRef}
      label='Identity Information'
      required={true}
    />
  </SignatureBase>
}