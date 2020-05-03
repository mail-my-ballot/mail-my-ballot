import React from 'react'

import { WisconsinInfo } from '../../common'
import { SignatureBase, StateProps } from './Base'


export const Wisconsin = ({address, locale}: StateProps<'Wisconsin'>) => {
  return <SignatureBase<WisconsinInfo>
    address={address}
    locale={locale}
    enrichValues={(info) => ({...info, state: 'Wisconsin'})}
  />
}
