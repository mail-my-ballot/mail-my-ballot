import pdf from 'html-pdf'

export const toPdfBuffer = async (html: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const wrappedHtml = `<div style='margin: 72px;'>${html}</div>`
    pdf.create(wrappedHtml, { format: 'Letter' }).toBuffer((err, buffer) => {
      if (err) reject(err)
      resolve(buffer)
    })
  })
}
