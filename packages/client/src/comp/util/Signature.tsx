import React from 'react'
import SignatureCanvas from 'react-signature-canvas'
import styled from 'styled-components'
import { RoundedButton } from './Button'
import { Switchable, Choice } from './Switchable'
import { UploadButton } from './UploadButton'

const width = 300
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
}>

const style: React.CSSProperties = {
  margin: '2em auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width,
}

const Canvas: React.FC<Props> = ({ setSignature }) => {
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

  return <>
    <div>
      <Label>Signature (use your Mouse or Finger)</Label>
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
  </>
}

export const Signature: React.FC<Props> = ({ setSignature }) => {
  return <div style={style}>
    <div style={{margin: 'auto'}}>
      <Switchable>
      {
        (choice: Choice) => {
          if (choice === 'canvas') {
            return <div style={style}>
              <Canvas setSignature={setSignature}/>
            </div>
          } else {
            return <div style={style}>
              <div>
                <Label>Upload Signature Image</Label>
                <UploadButton label='Upload' setDataString={setSignature} />
              </div>
            </div>
          }
        }
      }
      </Switchable>
    </div>
  </div>
}
