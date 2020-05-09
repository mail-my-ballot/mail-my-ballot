import React from 'react'

import { NevadaInfo } from '../../common'
import { SignatureBase } from './Base'


export const Nevada = () => {
  return <SignatureBase<NevadaInfo>
    enrichValues={(info) => ({...info, state: 'Nevada'})}
  />
}
