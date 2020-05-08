import React from 'react'

import { MarylandInfo } from '../../common'
import { SignatureBase, StateProps } from './Base'


export const Maryland = ({address, locale}: StateProps<'Maryland'>) => {
  return <SignatureBase<MarylandInfo>
    address={address}
    locale={locale}
    enrichValues={(info) => ({...info, state: 'Maryland'})}
  />
}
