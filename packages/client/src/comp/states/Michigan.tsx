import React from 'react'
import Checkbox from 'muicss/lib/react/checkbox'

import { MichiganInfo } from '../../common'
import { SignatureBase } from './Base'
import { useCheckboxRef } from '../util/ControlRef'


export const Michigan = () => {
  const ref = useCheckboxRef()

  return <SignatureBase<MichiganInfo>
    enrichValues={(info) => {
      const permanentList = ref.value()
      if (permanentList == null) return null
      return {...info, state: 'Michigan', permanentList}
    }}
  >
    <Checkbox
      ref={ref => ref}
      label={'Request Michigan mail me an application for absentee ballots for all future elections.'}
      defaultChecked={true}
    />
  </SignatureBase>
}
