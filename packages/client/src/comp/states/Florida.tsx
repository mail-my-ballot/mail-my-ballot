import React from 'react'

import { FloridaInfo } from '../../common'
import { SignatureBase, StateProps } from './Base'


export const Florida = ({address, locale}: StateProps<'Florida'>) => {
  return <SignatureBase<FloridaInfo>
    address={address}
    locale={locale}
    enrichValues={(info) => ({...info, state: 'Florida'})}
  />
}
