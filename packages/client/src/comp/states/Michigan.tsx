import React from 'react'

import { MichiganInfo } from '../../common'
import { SignatureBase } from './Base'


export const Michigan = () => {
  return <SignatureBase<MichiganInfo>
    enrichValues={(info) => ({...info, state: 'Michigan'})}
  />
}
