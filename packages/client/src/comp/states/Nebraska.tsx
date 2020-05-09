import React from 'react'

import { NebraskaInfo } from '../../common'
import { SignatureBase } from './Base'


export const Nebraska = () => {
  return <SignatureBase<NebraskaInfo>
    enrichValues={(info) => ({...info, state: 'Nebraska'})}
  />
}
