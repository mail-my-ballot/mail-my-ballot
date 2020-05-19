import React from 'react'
import styled from 'styled-components'

import { Switchable, Choice } from './Switchable'
import { Upload } from './Upload'
import { Canvas } from './Canvas'

const width = 300
const height = width / 1.618

const Label = styled.label`
  font-size: 12px;
  color: rgba(30, 134, 218, 0.918);
`

const style: React.CSSProperties = {
  margin: '2em auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width,
}

type Props = React.PropsWithChildren<{
  setSignature: (_: string | null) => void
}>

export const Signature: React.FC<Props> = ({ setSignature }) => {
  return <div style={style}>
    <div style={{margin: 'auto'}}>
      <Switchable>
      {
        (choice: Choice) => {
          if (choice === 'canvas') {
            return <div style={style}>
              <div>
                <Label>Signature (use your Mouse or Finger)</Label>
                <Canvas setSignature={setSignature} width={width} height={height}/>
              </div>
            </div>
          } else {
            return <div style={style}>
              <div>
                <Label>Upload Signature Image</Label>
                <Upload label='Upload' setDataString={setSignature} />
              </div>
            </div>
          }
        }
      }
      </Switchable>
    </div>
  </div>
}
