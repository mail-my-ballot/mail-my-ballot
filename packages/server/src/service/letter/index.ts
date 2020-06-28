import mailgun from 'mailgun-js'
import marked from 'marked'
import nunjucks from 'nunjucks'

import { processEnvOrThrow, StateInfo, ContactMethod, ImplementedState } from '../../common'
import { fillNewHampshire } from '../pdfForm'
import { fillNorthCarolina } from '../pdfForm'

export const mg = mailgun({
  domain: processEnvOrThrow('MG_DOMAIN'),
  apiKey: processEnvOrThrow('MG_API_KEY'),
})

nunjucks.configure(__dirname + '/views', {
  autoescape: true,
  noCache: !!process.env.NUNJUNKS_DISABLE_CACHE
})

const envVars = {
  brandName: processEnvOrThrow('REACT_APP_BRAND_NAME'),
  brandUrl: processEnvOrThrow('REACT_APP_URL'),
  feedbackEmail: processEnvOrThrow('REACT_APP_FEEDBACK_ADDR'),
  electionsEmail: processEnvOrThrow('REACT_APP_ELECTION_OFFICIAL_ADDR'),
  election: processEnvOrThrow('REACT_APP_ELECTION_AND_DATE'),
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

export class Letter {
  readonly confirmationId: string
  readonly subject: string
  readonly method: ContactMethod
  readonly info: StateInfo
  readonly signatureAttachment?: mailgun.Attachment
  readonly idPhotoAttachment?: mailgun.Attachment
  readonly form?: Promise<Buffer | undefined>

  constructor(
    info: StateInfo,
    method: ContactMethod,
    confirmationId: string,
    customSubject?: string,
  ) {
    this.confirmationId = confirmationId
    this.subject = customSubject ?? subject(info.state)
    this.method = method
    this.info = info,
    this.signatureAttachment = this.makeAttachment('signature')
    this.idPhotoAttachment = this.makeAttachment('identification')
    this.form = pdfForm(info)
  }

  /**
   * Returns a generated markdown of this Letter.
   * @param dest There's a few differences between the HTML standards used
   * in the main email providers and the one found around the web, dest
   * allows to adapt the resulted markdown for these differences.
   */
  md = (dest: 'email' | 'html') => {
    return nunjucks.render(
      template(this.info.state),
      {
        ...this.info,
        ...envVars,
        confirmationId: this.confirmationId,
        method: this.method,
        warning: !process.env.EMAIL_FAX_OFFICIALS,
        signature: dest === 'email'
          ? `cid:${this.signatureAttachment?.filename}`
          : this.info.signature,
        idPhoto: dest === 'email'
          ? `cid:${this.idPhotoAttachment?.filename}`
          : this.info.idPhoto,
      },
    )
  }

  /**
   * Parses the generated markdown for this Letter.
   * @param dest There's a few differences between the HTML standards used
   * in the main email providers and the one found around the web, dest
   * allows to adapt the resulted markdown for these differences.
   */
  render = (dest: 'email' | 'html') => marked(this.md(dest))

  /**
   * If image is empty or undefined then it returns undefined, on errors
   * (i.e. invalid image) it also returns undefined but logs the incident
   * on the console.
   *
   * @param filename Will define the title of the filename
   */
  private makeAttachment = (filename: 'signature' | 'identification') => {
    const image = filename === 'signature' ? this.info.signature : this.info.idPhoto

    if (!image) {
      return undefined
    }

    const match = image.match(/data:image\/(.+);base64,(.+)/)

    // this.isValid() will be able to identify this Letter has issues,
    // being able to properly report errors later on.
    if (!match) {
      console.log(`Unable to read image ${filename} image to ${this.info.email}. Omitting attachment.`)
      return undefined
    }

    const data = Buffer.from(match[2], 'base64')
    const filenameExt = `${filename}.${match[1]}`

    return new mg.Attachment({data, filename: filenameExt})
  }
}
