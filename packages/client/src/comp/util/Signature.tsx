import React from 'react'

import { Switchable } from './Switchable'
import { Upload } from './Upload'
import { Canvas } from './Canvas'
import { useAppHistory } from '../../lib/path'
import styled from 'styled-components'

const width = 300
const height = width / 1.618

const Margin = styled.div`
  padding-top: 15px;
  margin-bottom: 20px;
`

type Props = React.PropsWithChildren<{
  setSignature: (_: string | null) => void
  setUsedCanvas: (_: boolean) => void
  usedCanvas: boolean
}>

export const Signature: React.FC<Props> = ({ setSignature, setUsedCanvas, usedCanvas }) => {
  const { query } = useAppHistory()
  return <Margin>
    <Switchable visible={query['case'] !== 'upload'} usedCanvas={usedCanvas} setUsedCanvas={setUsedCanvas}>
    {
      (usedCanvas) => {
        if (usedCanvas) {
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
