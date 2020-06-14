import React from 'react'

import { WyomingInfo } from '../../common'
import { Base } from './Base'
import { AppCheckbox } from '../util/Checkbox'


export const Wyoming = () => {
  return <Base<WyomingInfo>
    enrichValues={(info) => ({...info, state: 'Wyoming'})}
  >
    <AppCheckbox label={'I am eligible to vote'} required={true}/>
  </Base>
}
