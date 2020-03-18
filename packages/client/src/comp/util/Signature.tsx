import React from 'react'
import SignatureCanvas from 'react-signature-canvas'
import styled from 'styled-components'

const Label = styled.label`
  font-size: 12px;
  color: rgba(30, 134, 218, 0.918);;
`

const BottomLine = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.26);
  width: 500px;
`

type Props = React.PropsWithChildren<{
  inputRef: React.RefObject<SignatureCanvas>
  label: string
}>

export const Signature = ({ inputRef, label }: Props) => (<div>
    <Label>{label}</Label>
    <BottomLine>
      <SignatureCanvas
        canvasProps={{width: 500, height: 200}}
        ref={inputRef}
      />
    </BottomLine>
  </div>
)
