import React from 'react'

import { NevadaInfo } from '../../common'
import { SignatureBase } from './Base'
import { Upload } from '../util/Upload'
import { Togglable } from '../util/Togglable'


export const Nevada = () => {
  const [idPhoto, setIdPhoto] = React.useState<string>()
  
  return <SignatureBase<NevadaInfo>
    enrichValues={(info) => {
      return {
        ...info,
        idPhoto,
        state: 'Nevada'
      }
    }}
  >
    <Togglable
      id='needIdPhoto'
      label='This is my first time voting in Nevada.'
    >
      {(checked) => <>
        <p>Nevada requires all first-time voters to submit a copy of their ID.  You do not need to do this if you have voted before, either by mail or in person.</p>
        <Upload label='Upload Photo of ID' setDataString={setIdPhoto} required={checked}/>
      </>}
    </Togglable>
  </SignatureBase>
}
