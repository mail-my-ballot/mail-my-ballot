const highestDimension = 2000


/**
 * Returns an approximation of the base64 image data in MB
 *
 * This value is not 100% precise and might be bigger than the actual result,
 * since it doesn't remove from calculations base64 padders (`==`)
 */
export const getBase64Size = (imgSrc: string) => {
  const split = imgSrc.split(',')
  // To prevent errors
  if (split.length === 0) return 0
  return split[split.length-1].length * 0.75 / Math.pow(1024, 2)
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

  image.src = imageData

  // It takes some time to load the image, which is why we have to await
  // for the image to load with this function
  image.onload = () => {
    const context = canvas.getContext('2d')

    // Prepares a blank canvas
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

    // Ensures no blank space is saved with the picture
    if (context) {
      context.canvas.width = newWidth
      context.canvas.height = newHeight
    }

    context?.drawImage(image, 0, 0, newWidth, newHeight)
    const resized = context?.canvas.toDataURL('image/jpeg') ?? ''

    canvas.remove()
    image.remove()
    resolve(resized)
  }
})
