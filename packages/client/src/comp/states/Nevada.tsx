import React from 'react'

import { NevadaInfo } from '../../common'
import { SignatureBase, StateProps } from './Base'


export const Nevada = ({address, locale}: StateProps<'Nevada'>) => {
  return <SignatureBase<NevadaInfo>
    address={address}
    locale={locale}
    enrichValues={(info) => ({...info, state: 'Nevada'})}
  />
}
