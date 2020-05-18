import React from 'react'
import { RoundedButton } from './Button'

export type Choice = 'upload' | 'canvas'

interface Props {
  children: (choice: Choice) => React.ReactNode
}

export const Switchable: React.FC<Props> = ({children}) => {
  const [choice, setChoice] = React.useState<Choice>('upload')
  return <>
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <RoundedButton
        style={{marginRight: '0', borderRadius: '2em 0 0 2em'}}
        color='primary'
        disabled={choice === 'upload'}
        onClick={() => setChoice('upload')}
      >
        Upload
      </RoundedButton>
      <RoundedButton
        style={{marginLeft: '0', borderRadius: '0 2em 2em 0'}}
        color='primary'
        disabled={choice === 'canvas'}
        onClick={() => setChoice('canvas')}
      >
        Pad
      </RoundedButton>
    </div>
    {(choice && children) && children(choice)}
  </>
}
