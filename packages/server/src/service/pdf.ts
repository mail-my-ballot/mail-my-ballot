import pdf from 'html-pdf'

export const toPdfBuffer = async (html: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    pdf.create(html, { format: 'Letter' }).toBuffer((err, buffer) => {
      if (err) reject(err)
      resolve(buffer)
    })
  })
}
