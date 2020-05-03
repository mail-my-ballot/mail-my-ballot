import React from 'react'
import { Base } from './Base'

type Props = React.PropsWithChildren<{
  address: Address
  locale: Locale<'Florida'>
}>

export const Florida = ({address, locale }: Props) => {

  return <Base address={address} locale={locale}/>
}
