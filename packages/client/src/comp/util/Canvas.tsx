import React from 'react'
import SignatureCanvas from 'react-signature-canvas'
import styled from 'styled-components'

import { SmallButton } from './Button'
import { GoldRatioOutline } from './Outline'

const WhiteButton = styled(SmallButton)`
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

export const Canvas: React.FC<Props> = ({ setSignature }) => {
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

  const centerBlock: React.CSSProperties = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  }

  return <div>
    <GoldRatioOutline>
      { ({width, height}) => <SignatureCanvas
        canvasProps={
          {width, height, 'data-testid': 'canvas'} as React.CanvasHTMLAttributes<HTMLCanvasElement>
        }
        ref={ref}
        onEnd={onEnd}
      /> }
    </GoldRatioOutline>
    <WhiteButton onClick={clearClick} style={centerBlock}>
      Clear Signature
    </WhiteButton>
  </div>
}
