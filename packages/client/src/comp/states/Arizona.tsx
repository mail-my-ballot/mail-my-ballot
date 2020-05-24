import React from 'react'

import { ArizonaInfo } from '../../common'
import { Base } from './Base'


export const Arizona = () => {
  return <Base<ArizonaInfo>
    enrichValues={(info) => ({...info, state: 'Arizona'})}
  />
}
