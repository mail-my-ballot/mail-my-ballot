import React from 'react'

import { FloridaInfo } from '../../common'
import { SignatureBase } from './Base'


export const Florida = () => {
  return <SignatureBase<FloridaInfo>
    enrichValues={(info) => ({...info, state: 'Florida'})}
  />
}
