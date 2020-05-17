import React from 'react'

import { WisconsinInfo } from '../../common'
import { Base } from './Base'
import { UploadButton } from '../util/UploadButton'
import { Togglable } from '../util/Togglable'



export const Wisconsin = () => {
  const [idPhoto, setIdPhoto] = React.useState<string>()

  return <Base<WisconsinInfo>
    enrichValues={(info) => {
      return {
        ...info,
        idPhoto,
        state: 'Wisconsin'
      }
    }}
  >
    <Togglable
      id='needIdPhoto'
      label='This is my first time voting by mail.'
    >
      {(checked) => <>
        <p>Wisconsin requires all first-time voters to submit a copy of their ID.</p>
        <UploadButton label='Upload Photo of ID' setDataString={setIdPhoto} required={checked}/>
      </>}
    </Togglable>
  </Base>
}
