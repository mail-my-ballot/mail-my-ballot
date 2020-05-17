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
      if (file.size > 1024 * 1024) {
        window.alert('File size is limited to 1MB')
      } else {
        const data = await toDataUrl(file)
        setImage({name: file.name, data: data})
        setDataString(data)
      }
    }
  }

  const centerBlock: React.CSSProperties = {
    display: 'block',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  }

  return <div>
    <div onClick={onClick} style={style}>
      <div>
        {
          (image) ? <>
              <img src={image.data} style={{maxHeight: '150px', ...centerBlock}}/>
              <small style={centerBlock}>{image.name}</small>
            </>
            : <>
              <h1 style={{marginTop: '0', ...centerBlock}}><i className="fa fa-upload" aria-hidden="true"/></h1>
              <p style={centerBlock}>Limit: 1MB</p>
            </>
        }
        <RoundedButton color='primary' style={centerBlock} >{label}</RoundedButton>
      </div>
    </div>
    <input
      name='upload'
      type='file'
      style={{opacity: '0', height: '1px' }}
      ref={el => ref.current = el}
      onChange={onChange}
      accept='image/*,.pdf'
      required={required}
    />
  </div>
}
