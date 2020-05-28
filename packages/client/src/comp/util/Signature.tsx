import React from 'react'

import { Switchable, Choice } from './Switchable'
import { Upload } from './Upload'
import { Canvas } from './Canvas'
import styled from 'styled-components'

const width = 300
const height = width / 1.618

const Margin = styled.div`
  padding-top: 15px;
  margin-bottom: 20px;
`

type Props = React.PropsWithChildren<{
  setSignature: (_: string | null) => void
}>

export const Signature: React.FC<Props> = ({ setSignature }) => {
  return <Margin>
    <Switchable>
    {
      (choice: Choice) => {
        if (choice === 'canvas') {
          return <div>
            <div>
              <Canvas setSignature={setSignature} width={width} height={height}/>
            </div>
          </div>
        } else {
          return <div>
            <div>
              <Upload label='Upload Signature' setDataString={setSignature} />
            </div>
          </div>
        }
      }
    }
    </Switchable>
  </Margin>
}
