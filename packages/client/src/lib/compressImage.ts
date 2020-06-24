// Empirically, jpegs smaller than 2000 x 2000 are 500KB and vary from 300 - 700KB.
const maxDimension = 2000

/***
 * Possibly shrinks naturalWidth and naturalHeight so that no dimension is larger than maxDimension
 * May not shrink at all if both dimensions are no greater than maxDimension
 *
 * @param naturalWidth The original width
 * @param naturalHeight The original height
 */
export const compressedDimensions = (
  naturalWidth: number,
  naturalHeight: number,
  maxDim: number = maxDimension,
): {width: number, height: number} => {
  const scaling = Math.min(maxDim / Math.max(naturalWidth, naturalHeight), 1)
  return {
    width: naturalWidth * scaling,
    height: naturalHeight * scaling,
  }
}

/**
 * Compress an image to `jpeg` aiming to keep all received content smaller
 * than 1mb.
 *
 * @param imageData The Base64 image string containing metadata, i.e. `data:image/png;base64,`
 */
export const compressImage = (imageData: string) => new Promise<string>((resolve) => {
  const canvas = document.createElement('canvas')
  const image = new Image()

  image.style.display = 'none'
  canvas.style.display = 'none'

  const cleanup = () => {
    canvas.remove()
    image.remove()
  }

  // It takes some time to load the image, which is why we have to await
  // for the image to load with this function
  image.onload = () => {
    const context = canvas.getContext('2d')
    // Prepares a blank canvas
    if (!context) return cleanup()
    const { naturalWidth, naturalHeight } = image
    const {width, height} = compressedDimensions(naturalWidth, naturalHeight)
    context.canvas.width = width
    context.canvas.height = height

    context.clearRect(0, 0, width, height)
    context.drawImage(image, 0, 0, width, height)
    const resized = context.canvas.toDataURL('image/jpeg')

    cleanup()
    resolve(resized)
  }

  image.src = imageData
})
