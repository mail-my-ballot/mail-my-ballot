import React from 'react'

import { MarylandInfo } from '../../common'
import { SignatureBase } from './Base'


export const Maryland = () => {
  return <SignatureBase<MarylandInfo>
    enrichValues={(info) => ({...info, state: 'Maryland'})}
  />
}
