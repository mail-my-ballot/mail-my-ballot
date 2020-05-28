import React from 'react'
import { SmallButton } from './Button'
import { GoldRatioOutline } from './Outline'
import styled from 'styled-components'
import { Muted } from './Text'

const toDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)  
    reader.onload = () => { resolve(reader.result as string) }
    reader.onerror = () => { 
      reader.abort()
      reject(reader.result)
    }
  })
}

interface Props {
  label: string
  setDataString: (dataString: string) => void
  required?: boolean
  maxSizeMB?: number
}

interface Image {
  name: string
  data: string
}

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:    center;
  height: 100%;
`

export const Upload: React.FC<Props> = ({
  label,
  setDataString,
  required,
  maxSizeMB,
}) => {
  const ref = React.useRef<HTMLInputElement | null>()
  const [image, setImage] = React.useState<Image>()

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault()
    if (ref.current) ref.current.click()
  }

  const maxSizeMBReal = maxSizeMB ?? 1

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      if (file.size > (maxSizeMBReal * 1024 * 1024)) {
        window.alert(`File size is limited to ${maxSizeMBReal}MB`)
      } else {
        const data = await toDataUrl(file)
        setImage({name: file.name, data: data})
        setDataString(data)
      }
    }
  }

  const centerBlock: React.CSSProperties = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  }

  return <div>
    <div onClick={onClick}>
    <GoldRatioOutline>
      {
        ({width, height}) => (<div data-testid='upload-click-target' style={{width, height}}>
          <FlexBox>
          {
            (image) ? <>
                <img src={image.data} style={{maxHeight: '150px'}} alt='thumbnail'/>
                <Muted>{image.name}</Muted>
              </>
              : <>{
                // eslint-disable-next-line
                }<h1 style={{marginTop: '0', paddingTop: '0'}}><i className="fa fa-upload" aria-hidden="true"/></h1>
                  <Muted>Limit: {maxSizeMBReal}MB</Muted>
                  <SmallButton color='primary' style={centerBlock} >{label}</SmallButton>
                </>   
          }
          </FlexBox>
        </div>)
      }
    </GoldRatioOutline>
    </div>
    <input
      data-testid='upload-input'
      name='upload'
      type='file'
      style={{opacity: 0, height: 0 }}
      ref={el => ref.current = el}
      onChange={onChange}
      accept='image/*,.pdf'
      required={required}
    />
  </div>
}
