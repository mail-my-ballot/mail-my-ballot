import React from 'react'
import { SmallButton } from './Button'


interface Props {
  children: (usedCanvas: boolean) => React.ReactNode
  visible: boolean
  usedCanvas: boolean
  setUsedCanvas: (_: boolean) => void
}

export const Switchable: React.FC<Props> = ({children, visible, usedCanvas, setUsedCanvas}) => {
  return <>
    <div style={{display: visible ? 'flex' : 'none' , justifyContent: 'center'}}>
      <SmallButton
        style={{marginRight: '0', borderRadius: '4px 0 0 4px'}}
        color='primary'
        disabled={!usedCanvas}
        onClick={() => setUsedCanvas(false)}
      >
        Upload
      </SmallButton>
      <SmallButton
        style={{marginLeft: '0', borderRadius: '0 4px 4px 0'}}
        color='primary'
        disabled={usedCanvas}
        onClick={() => setUsedCanvas(true)}
      >
        Pad
      </SmallButton>
    </div>
    {(visible && children) && children(usedCanvas)}
  </>
}
