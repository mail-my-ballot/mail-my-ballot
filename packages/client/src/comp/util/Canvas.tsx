import React from 'react'
import SignatureCanvas from 'react-signature-canvas'
import styled from 'styled-components'
import { useRef } from 'preact/compat'

import { SmallButton } from './Button'
import { GoldRatioOutline } from './Outline'
import { Muted } from './Text'

const WhiteButton = styled(SmallButton)`
  margin: 1em 0;
  background: #ffffff;
  color: #000;
  :hover {
    background: #fbfbfb;
    color: #000;
  }
`

const CanvasContainer = styled.div`
  position: relative;
  text-align: center;
`

const CanvasOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

type Props = React.PropsWithChildren<{
  setSignature: (_: string | null) => void
  width: number
  height: number
}>

export const Canvas: React.FC<Props> = ({ setSignature }) => {
  const ref = useRef<SignatureCanvas>(null)
  const [dirty, setDirty] = React.useState<boolean>(false)

  const onBegin = () => {
    setDirty(true)
  }
  
  const onEnd = () => {
    if (!ref.current) return
    if (ref.current.isEmpty()) {
      setSignature(null)
    } else {
      setSignature(ref.current.toDataURL())
    }
  }

  const clearClick: React.MouseEventHandler = (event) => {
    event.preventDefault()
    ref.current && ref.current.clear()
    setSignature(null)
    setDirty(false)
  }

  const centerBlock: React.CSSProperties = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  }

  return <div>
    <GoldRatioOutline>
      { ({width, height}) => <CanvasContainer>
          <SignatureCanvas
            canvasProps={
              {width, height, 'data-testid': 'canvas'} as React.CanvasHTMLAttributes<HTMLCanvasElement>
            }
            ref={ref => ref}
            onBegin={onBegin}
            onEnd={onEnd}
          />
          {dirty ? null : <CanvasOverlay><Muted>Sign with your Mouse or Finger</Muted></CanvasOverlay>}
        </CanvasContainer>
      }
    </GoldRatioOutline>
    <WhiteButton onClick={clearClick} style={centerBlock}>
      Clear Signature
    </WhiteButton>
  </div>
}
