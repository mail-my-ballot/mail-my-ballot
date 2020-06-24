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

const getBase64Size = (imgSrc: string) => {
  const split = imgSrc.split(',')
  // To prevent errors
  if (split.length === 0) return 0
  return split[split.length-1].length * 0.75
}

interface Props {
  label: string
  setDataString: (dataString: string) => void
  required?: boolean
  maxSizeMB?: number
}

interface ImageDetails {
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
  const [image, setImage] = React.useState<ImageDetails>()
  // If the image is above 1mb it is loaded and compressed used this canvas
  const canvasRef = React.useRef<HTMLCanvasElement | null>()
  const anchorRef = React.useRef<HTMLAnchorElement | null>()

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault()
    if (ref.current) ref.current.click()
  }

  // The highest value, in pixels, that either width or height can have
  const highestDimension = 2000
  const Compress = async (file: File) => {
    const image = new Image()
    const data = await toDataUrl(file)
    image.src = data

    // It takes some time to load the image, which is why we have to await
    // for the image to load with this function
    image.onload = () => {
      const context = canvasRef.current?.getContext('2d')

      // Clears previous uploads & resets canvas size
      if (context) {
        context.canvas.width = highestDimension
        context.canvas.height = highestDimension
      }
      context?.clearRect(0, 0, context?.canvas.width, context?.canvas.height)

      // Decide if the image needs resizing
      const { naturalWidth: width, naturalHeight: height } = image
      let newWidth = width
      let newHeight = height

      if (Math.max(width, height) > highestDimension) {
        const portrait = height > width
        // Downscale ratio
        const ratio = portrait ? width / height : height / width
        if (portrait) {
          newHeight = highestDimension
          newWidth = highestDimension * ratio
        } else {
          newWidth = highestDimension
          newHeight = highestDimension * ratio
        }
      }

      // The canvas might have some unused space since (unless the picture is a square)
      // either the width or height are going to be 2000px. We don't need
      // to save that.
      if (context) {
        context.canvas.width = newWidth
        context.canvas.height = newHeight
      }

      context?.drawImage(image, 0, 0, newWidth, newHeight)
      const resized = context?.canvas.toDataURL('image/jpeg') ?? ''

      if (process.env.REACT_APP_ENVIRONMENT !== 'production') {
        // Updates the anchor element so we might download the image and
        // compare its compressed size, an estimate of the size is sent
        // to the console
        if (anchorRef.current) {
          console.log(`Image was resized to ~= ${getBase64Size(resized)} bytes`)
          anchorRef.current.href = resized
          anchorRef.current.style.display = 'inline-block'
        }
      }

      setImage({name: file.name, data: resized})
      setDataString(resized)
    }
  }

  const maxSizeMBReal = maxSizeMB ?? 1

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      if (file.size > (maxSizeMBReal * 1024 * 1024)) {
        await Compress(file)
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
    <canvas
      ref={el => canvasRef.current = el}
      width={highestDimension}
      height={highestDimension}
      style={{ display: 'none' }}
    />
    {
      // Allows to download the image when on debug versions
      process.env.REACT_APP_ENVIRONMENT !== 'production' &&
      <a
        href='#downloadImage'
        download='resized.jpg'
        ref={el => anchorRef.current = el}
        style={{ display: 'none' }}
      >
        Download Resized
        {` ${(getBase64Size(image?.data ?? '') / Math.pow(1024, 2)).toFixed(2)}`} MB
        <button onClick={() => {
          if (anchorRef.current) {
            anchorRef.current.style.display = 'none'
          }
        }}>
          Hide This
        </button>
      </a>
    }
  </div>
}
