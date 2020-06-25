import React from 'react'

import { MassachusettsInfo } from '../../common'
import { SignatureBase } from './Base'


export const Massachusetts = () => {
  return <SignatureBase<MassachusettsInfo>
    enrichValues={(info) => ({...info, state: 'Massachusetts'})}
  />
}
