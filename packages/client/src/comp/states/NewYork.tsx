
import React from 'react'

import { NewYorkInfo } from '../../common'
import { Base } from './Base'


export const NewYork = () => {
  return <Base<NewYorkInfo>
    enrichValues={(info) => ({...info, state: 'New York'})}
  />
}
