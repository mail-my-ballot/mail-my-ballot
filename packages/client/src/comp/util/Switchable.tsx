import React from 'react'
import { SmallButton } from './Button'


export type Choice = 'upload' | 'canvas'

interface Props {
  children: (choice: Choice) => React.ReactNode
}

export const Switchable: React.FC<Props> = ({children}) => {
  const [choice, setChoice] = React.useState<Choice>('upload')
  return <>
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <SmallButton
        style={{marginRight: '0', borderRadius: '4px 0 0 4px'}}
        color='primary'
        disabled={choice === 'upload'}
        onClick={() => setChoice('upload')}
      >
        Upload
      </SmallButton>
      <SmallButton
        style={{marginLeft: '0', borderRadius: '0 4px 4px 0'}}
        color='primary'
        disabled={choice === 'canvas'}
        onClick={() => setChoice('canvas')}
      >
        Pad
      </SmallButton>
    </div>
    {(choice && children) && children(choice)}
  </>
}
