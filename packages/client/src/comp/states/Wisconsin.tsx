import React from 'react'

import { WisconsinInfo } from '../../common'
import { Base } from './Base'


export const Wisconsin = () => {
  return <Base<WisconsinInfo>
    enrichValues={(info) => ({...info, state: 'Wisconsin'})}
  />
}
