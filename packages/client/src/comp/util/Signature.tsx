import React from 'react'
import { useLocation } from "react-router-dom"

import { Switchable, Choice } from './Switchable'
import { Upload } from './Upload'
import { Canvas } from './Canvas'
import { parseQS } from '../../lib/path'
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
  const { search } = useLocation()
  const params = parseQS(search)
  return <Margin>
    <Switchable visible={Boolean(!params.case)}>
    {
      (choice: Choice) => {
        if (choice === 'canvas' || params.case === 'a') {
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
