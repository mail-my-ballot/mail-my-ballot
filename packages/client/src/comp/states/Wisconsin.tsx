import React from 'react'

import { WisconsinInfo } from '../../common'
import { Base } from './Base'
import { Upload } from '../util/Upload'
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
      label='This is my first time voting by mail in Wisconsin.'
    >
      {(checked) => <>
        <p>Wisconsin requires all first-time Vote-by-Mail voters to submit a copy of their ID, even if they have voted in-person in the state previously.</p>
        <Upload label='Upload Photo of ID' setDataString={setIdPhoto} required={checked}/>
      </>}
    </Togglable>
  </Base>
}
