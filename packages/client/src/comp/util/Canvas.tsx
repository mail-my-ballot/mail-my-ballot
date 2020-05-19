import React from 'react'
import SignatureCanvas from 'react-signature-canvas'
import styled from 'styled-components'

import { RoundedButton } from './Button'

const WhiteButton = styled(RoundedButton)`
  margin: 1em 0;
  background: #ffffff;
  color: #000;
  :hover {
    background: #fbfbfb;
    color: #000;
  }
`

type Props = React.PropsWithChildren<{
  setSignature: (_: string | null) => void
  width: number
  height: number
}>

export const Canvas: React.FC<Props> = ({ width, height, setSignature }) => {
  const ref = React.useRef<SignatureCanvas>(null)
  
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
  }

  const bottomLine: React.CSSProperties = {
    borderBottom: '1px solid rgba(0, 0, 0, 0.26)',
    width: `${width}px`
  }

  return <>
    <div style={bottomLine} data-testid='signature-canvas-wrap'>
      <SignatureCanvas data-testid='signature-canvas'
        canvasProps={
          {width, height, 'data-testid': 'canvas'} as React.CanvasHTMLAttributes<HTMLCanvasElement>
        }
        ref={ref}
        onEnd={onEnd}
      />
    </div>
    <WhiteButton onClick={clearClick} variant='raised'>
      Clear Signature
    </WhiteButton>
  </>
}
