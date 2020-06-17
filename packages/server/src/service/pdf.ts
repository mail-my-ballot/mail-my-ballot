import pdf from 'html-pdf'
import { PDFDocument } from 'pdf-lib'

export const createPdfBuffer = async (html: string, options?: pdf.CreateOptions): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) reject(err)
      resolve(buffer)
    })
  })
}

const concat = async (...pdfBuffers: Buffer[]): Promise<Buffer> => {
  const docs = await Promise.all(
    pdfBuffers.map(pdfBuffer => PDFDocument.load(pdfBuffer))
  )
  const pdf = await PDFDocument.create()
  const arrayPages = await Promise.all(
    docs.map(doc => pdf.copyPages(doc, doc.getPageIndices()))
  )
  const pages = arrayPages.flatMap(pages => pages)
  pages.forEach(page => pdf.addPage(page))
  return Buffer.from(await pdf.save())
}

export const toPdfBuffer = async (html: string, formBuffer?: Buffer): Promise<Buffer> => {
  const nothing = { height: '0px', contents: '' }
  const letterBuffer = await createPdfBuffer(html, { format: 'Letter', border: '72px', header: nothing, footer: nothing })
  if (formBuffer) {
    return concat(letterBuffer, formBuffer)
  } else {
    return letterBuffer
  }
}
