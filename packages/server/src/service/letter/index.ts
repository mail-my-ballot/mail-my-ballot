import marked from 'marked'
import nunjucks from 'nunjucks'

import { processEnvOrThrow, StateInfo, ContactMethod } from '../../common'

nunjucks.configure(__dirname + '/views', {
  autoescape: true,
  noCache: !!process.env.NUNJUNKS_DISABLE_CACHE
})

interface Options { 
  signature?: string
  idPhoto?: string
}

export class Letter {
  md: string
  html: string
  method: ContactMethod
  signature?: string
  idPhoto?: string

  constructor(md: string, method: ContactMethod, { signature, idPhoto }: Options = {}) {
    this.md = md
    this.html = marked(md)
    this.method = method
    this.signature = signature
    this.idPhoto = idPhoto
  }
}

const envVars = {
  brandName: processEnvOrThrow('REACT_APP_BRAND_NAME'),
  brandUrl: processEnvOrThrow('REACT_APP_URL'),
  feedbackEmail: processEnvOrThrow('REACT_APP_FEEDBACK_ADDR'),
  electionsEmail: processEnvOrThrow('REACT_APP_ELECTION_OFFICIAL_ADDR'),
  election: processEnvOrThrow('REACT_APP_ELECTION_AND_DATE'),
}

const toTemplate = (info: StateInfo): string => {
  switch(info.state) {
    case 'Arizona': return 'Arizona.md'
    case 'Florida': return 'Florida.md'
    case 'Michigan': return 'Michigan.md'
    case 'Georgia': return 'Georgia.md'
    case 'Wisconsin': return 'Wisconsin.md'
    case 'Nebraska': return 'Nebraska.md'
    case 'Maine': return 'Maine.md'
    case 'Maryland': return 'Maryland.md'
    case 'Nevada': return 'Nevada.md'
    case 'New York': return 'NewYork.md'
  }
}

export const toLetter = (info: StateInfo, method: ContactMethod, confirmationId: string): Letter => {
  const template = toTemplate(info)
  return new Letter(
    nunjucks.render(template, { ...info, ...envVars, confirmationId, method }),
    method,
    { signature: info.signature, idPhoto: info.idPhoto }
  )
}
