import React from 'react'

import { WisconsinInfo } from '../../common'
import { Base, StateProps } from './Base'


export const Wisconsin = ({address, locale}: StateProps<'Wisconsin'>) => {
  return <Base<WisconsinInfo>
    address={address}
    locale={locale}
    enrichValues={(info) => ({...info, state: 'Wisconsin'})}
  />
}
