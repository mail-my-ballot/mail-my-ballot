import React from 'react'

import { MaineInfo } from '../../common'
import { SignatureBase } from './Base'


export const Maine = () => {
  return <SignatureBase<MaineInfo>
    enrichValues={(info) => ({...info, state: 'Maine'})}
  />
}
