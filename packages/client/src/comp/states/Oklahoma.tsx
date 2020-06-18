import React from 'react'
import { OklahomaInfo } from '../../common'
import { SignatureBase } from './Base'

export const Oklahoma = () => (
  <SignatureBase<OklahomaInfo>
    enrichValues={(info) => ({ ...info, state: 'Oklahoma' })}
  />
)