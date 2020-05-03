import React from 'react'

import { MichiganInfo } from '../../common'
import { SignatureBase, StateProps } from './Base'


export const Michigan = ({address, locale}: StateProps<'Michigan'>) => {
  return <SignatureBase<MichiganInfo>
    address={address}
    locale={locale}
    enrichValues={(info) => ({...info, state: 'Michigan'})}
  />
}
