import marked from 'marked'
import nunjucks from 'nunjucks'

import { processEnvOrThrow, StateInfo, ContactMethod, ImplementedState } from '../../common'
import { fillNewHampshire } from '../pdfForm'
import { fillNorthCarolina } from '../pdfForm'
import { makeImageAttachment } from '../mg'

nunjucks.configure(__dirname + '/views', {
  autoescape: true,
  noCache: !!process.env.NUNJUNKS_DISABLE_CACHE
})

interface Options {
  signature?: string
  idPhoto?: string
  form?: Buffer
}

export class Letter {
  subject: string
  md: string
  html: string
  method: ContactMethod
  signature?: string
  idPhoto?: string
  form?: Buffer

  constructor(
    subject: string,
    md: string,
    method: ContactMethod,
    { signature, idPhoto, form }: Options = {},
  ) {
    this.subject = subject
    this.md = md
    this.html = marked(md)
    this.method = method
    this.signature = signature
    this.idPhoto = idPhoto
    this.form = form
  }
}

const envVars = {
  brandName: processEnvOrThrow('REACT_APP_BRAND_NAME'),
  brandUrl: processEnvOrThrow('REACT_APP_URL'),
  feedbackEmail: processEnvOrThrow('REACT_APP_FEEDBACK_ADDR'),
  electionsEmail: processEnvOrThrow('REACT_APP_ELECTION_OFFICIAL_ADDR'),
  election: processEnvOrThrow('REACT_APP_ELECTION_AND_DATE'),
}

const template = (state: ImplementedState): string => {
  switch(state) {
    case 'Arizona': return 'Arizona.md'
    case 'Florida': return 'Florida.md'
    case 'Georgia': return 'Georgia.md'
    case 'Maine': return 'Maine.md'
    case 'Maryland': return 'Maryland.md'
    case 'Michigan': return 'Michigan.md'
    case 'Nebraska': return 'Nebraska.md'
    case 'Nevada': return 'Nevada.md'
    case 'New Hampshire': return 'NewHampshire.md'
    case 'New York': return 'NewYork.md'
    case 'North Carolina': return 'NorthCarolina.md'
    case 'Oklahoma': return 'Oklahoma.md'
    case 'Wisconsin': return 'Wisconsin.md'
    case 'Wyoming': return 'Wyoming.md'
  }
}

const subject = (state: ImplementedState) => {
  switch (state) {
    case 'Wyoming': return 'Absentee Ballot Request'
    default: return 'Vote By Mail Request'
  }
}

const pdfForm = async (info: StateInfo): Promise<Buffer | undefined> => {
  switch(info.state) {
    case 'New Hampshire': return fillNewHampshire(info)
    case 'North Carolina': return fillNorthCarolina(info)
    default: return undefined
  }
}

export const toLetter = async (
  info: StateInfo,
  method: ContactMethod,
  confirmationId: string
): Promise<Letter> => {
  return new Letter(
    subject(info.state),
    nunjucks.render(
      template(info.state),
      {
        ...info,
        ...envVars,
        confirmationId,
        method,
        warning: !process.env.EMAIL_FAX_OFFICIALS,
        signatureFile: info.signature
          ? makeImageAttachment(info.signature, 'signature', '')[0].filename
          : undefined,
        idPhotoFile: info.idPhoto
          ? makeImageAttachment(info.idPhoto, 'identification', '')[0].filename
          : undefined,
      }
    ),
    method,
    {
      signature: info.signature,
      idPhoto: info.idPhoto,
      form: await pdfForm(info),
    }
  )
}
