import React from 'react'

import { NebraskaInfo } from '../../common'
import { SignatureBase, StateProps } from './Base'


export const Nebraska = ({address, locale}: StateProps<'Nebraska'>) => {
  return <SignatureBase<NebraskaInfo>
    address={address}
    locale={locale}
    enrichValues={(info) => ({...info, state: 'Nebraska'})}
  />
}
