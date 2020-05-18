import React from 'react'
import SignatureCanvas from 'react-signature-canvas'
import styled from 'styled-components'
import { RoundedButton } from './Button'

const width = 350
const height = width / 1.618

const Label = styled.label`
  font-size: 12px;
  color: rgba(30, 134, 218, 0.918);
`

const BottomLine = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.26);
  width: ${width}px;
`

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
  label: string
}>

export const Signature = ({ setSignature, label }: Props) => {
  const ref = React.useRef<SignatureCanvas>(null)
  
  const onEnd = () => {
    if (!ref.current) return
    if (ref.current.isEmpty()) setSignature(null)
    setSignature(ref.current.toDataURL())
  }

  const clearClick: React.MouseEventHandler = (event) => {
    event.preventDefault()
    ref.current && ref.current.clear()
    setSignature(null)
  }

  const style: React.CSSProperties = {
    margin: '2em auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }

  return <div style={style}>
    <div style={{margin: 'auto'}}>
      <Label>{label}</Label>
      <BottomLine>
        <SignatureCanvas
          canvasProps={{width, height}}
          ref={ref}
          onEnd={onEnd}
        />
      </BottomLine>
    </div>
    <WhiteButton onClick={clearClick} variant='raised'>
      Clear Signature
    </WhiteButton>
  </div>
}
