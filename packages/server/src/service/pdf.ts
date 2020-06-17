import pdf from 'html-pdf'
import { PDFDocument } from 'pdf-lib'

const toLetterBuffer = async (html: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    pdf.create(html, { format: 'Letter', border: '72px' }).toBuffer((err, buffer) => {
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
  const letterBuffer = await toLetterBuffer(html)
  if (formBuffer) {
    return concat(letterBuffer, formBuffer)
  } else {
    return letterBuffer
  }
}
