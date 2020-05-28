import React from 'react'
import styled from 'styled-components'

const RawOutline = styled.div`
  border-width: 2px;
  border-style: dashed;
  border-color: #2196F3;
  width:        100%;
`

// To dynamically resize canvas https://stackoverflow.com/a/57272554
interface Sizable {
  width:  number
  height: number
}
interface SizableChilren {
  children: (props: Sizable) => React.ReactNode
}

export const GoldRatioOutline: React.FC<SizableChilren> = ({children}) => {
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

  return <RawOutline>
    <div style={{width: 'auto'}} ref={parentRef}>
      {size ? children(size) : null}
    </div>
  </RawOutline>
}
