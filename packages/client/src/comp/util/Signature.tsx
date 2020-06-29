import React, { useEffect } from 'react'

import { Switchable, Choice } from './Switchable'
import { trackEvent } from '../../lib/analytics'
import { Upload } from './Upload'
import { Canvas } from './Canvas'
import { ExperimentContainer } from '../../lib/unstated'
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
  const { experimentGroup } = ExperimentContainer.useContainer()
  const signatureType = experimentGroup('SignatureType')

  useEffect(() => {
    trackEvent('Experiment', 'Signature Type', signatureType)
  }, [signatureType])

  return <Margin>
    <Switchable visible={signatureType !== 'Upload'}>
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
