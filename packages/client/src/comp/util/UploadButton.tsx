import React from 'react'
import { RoundedButton } from './Button'

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
}


const style: React.CSSProperties = {
  borderWidth: '2px',
  borderStyle: 'dashed',
  borderColor: '#2196F3',
  minHeight: '200px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2em',
}

interface Image {
  name: string
  data: string
}

export const UploadButton: React.FC<Props> = ({
  label,
  setDataString,
  required
}) => {
  const ref = React.useRef<HTMLInputElement | null>()
  const [image, setImage] = React.useState<Image>()

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault()
    if (ref.current) ref.current.click()
  }

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      const data = await toDataUrl(file)
      setImage({name: file.name, data: data})
      setDataString(data)
    }
  }

  return <div>
    <div onClick={onClick} style={style}>
      <div>
        {
          (image) ? <>
              <img src={image.data} style={{maxHeight: '150px', display: 'block', margin: 'auto'}}/>
              <small style={{display: 'block', textAlign: 'center'}}>{image.name}</small>
            </>
            : <h1 style={{textAlign: 'center', marginTop: '0'}}><i className="fa fa-upload" aria-hidden="true"/></h1>
        }
        <RoundedButton color='primary' style={{display: 'block', margin: 'auto'}} >{label}</RoundedButton>
      </div>
    </div>
    <input name='upload' type='file' style={{opacity: '0', height: '1px' }} ref={el => ref.current = el} onChange={onChange} required={required}/>
  </div>
}
