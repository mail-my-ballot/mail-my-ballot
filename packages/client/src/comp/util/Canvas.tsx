import React from 'react'
import SignatureCanvas from 'react-signature-canvas'
import styled from 'styled-components'

import { SmallButton } from './Button'
import { Outline } from './Outline'

const WhiteButton = styled(SmallButton)`
  margin: 1em 0;
  background: #ffffff;
  color: #000;
  :hover {
    background: #fbfbfb;
    color: #000;
  }
`

// To dynamically resize canvas https://stackoverflow.com/a/57272554

interface Sizable {
  width:  number
  height: number
}
interface SizableChilren {
  children: (props: Sizable) => React.ReactNode
}

const ResizableCanvas: React.FC<SizableChilren> = ({children}) => {
  const parentRef = React.useRef<HTMLDivElement>(null)
  const [size, setSize] = React.useState<Sizable | null>(null)
  let timer: number | null = null
  
  const testDimension = () => {
    if (parentRef.current) {
      const width = parentRef.current.offsetWidth
      setSize({
        width, height: width / 1.618, 
      })
    }
  }

  // useLayoutEffect, not useEffect, for synchronous rerender
  React.useLayoutEffect(() => {
    testDimension()
  }, [])

  // reset for window resize
  window.addEventListener('resize', ()=>{
    if (timer) { clearInterval(timer) }
    timer = setTimeout(testDimension, 100)
  })

  return (
    <div style={{width: 'auto'}} ref={parentRef}>
      {size ? children(size) : null}
    </div>
  )
}

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

  return <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
    <Outline>
      <ResizableCanvas>
        { ({width, height}) => <SignatureCanvas
          canvasProps={
            {width, height, 'data-testid': 'canvas'} as React.CanvasHTMLAttributes<HTMLCanvasElement>
          }
          ref={ref}
          onEnd={onEnd}
        /> }
      </ResizableCanvas>
    </Outline>
    <WhiteButton onClick={clearClick} variant='raised'>
      Clear Signature
    </WhiteButton>
  </div>
}
