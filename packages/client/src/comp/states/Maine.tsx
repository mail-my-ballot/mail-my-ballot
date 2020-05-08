import React from 'react'

import { MaineInfo } from '../../common'
import { SignatureBase, StateProps } from './Base'


export const Maine = ({address, locale}: StateProps<'Maine'>) => {
  return <SignatureBase<MaineInfo>
    address={address}
    locale={locale}
    enrichValues={(info) => ({...info, state: 'Maine'})}
  />
}
