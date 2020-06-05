import pdf from 'html-pdf'

export const toPdfBuffer = async (html: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    pdf.create(html, { format: 'Letter', border: '72px' }).toBuffer((err, buffer) => {
      if (err) reject(err)
      resolve(buffer)
    })
  })
}
