import marked from 'marked'
import nunjucks from 'nunjucks'

import { processEnvOrThrow, StateInfo, ContactMethod, ImplementedState } from '../../common'

nunjucks.configure(__dirname + '/views', {
  autoescape: true,
  noCache: !!process.env.NUNJUNKS_DISABLE_CACHE
})

interface Options { 
  signature?: string
  idPhoto?: string
}

export class Letter {
  subject: string
  md: string
  html: string
  method: ContactMethod
  signature?: string
  idPhoto?: string

  constructor(subject: string, md: string, method: ContactMethod, { signature, idPhoto }: Options = {}) {
    this.subject = subject
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

const toTemplate = (state: ImplementedState): string => {
  switch(state) {
    case 'Arizona': return 'Arizona.md'
    case 'Florida': return 'Florida.md'
    case 'Georgia': return 'Georgia.md'
    case 'Maine': return 'Maine.md'
    case 'Maryland': return 'Maryland.md'
    case 'Michigan': return 'Michigan.md'
    case 'Nebraska': return 'Nebraska.md'
    case 'Nevada': return 'Nevada.md'
    case 'New York': return 'NewYork.md'
    case 'Wisconsin': return 'Wisconsin.md'
    case 'Wyoming': return 'Wyoming.md'
  }
}

export const toLetter = (info: StateInfo, method: ContactMethod, confirmationId: string): Letter => {
  return new Letter(
    info.state == 'Wyoming' ? 'Absentee Ballot Request' : 'Vote By Mail Request',
    nunjucks.render(
      toTemplate(info.state),
      {
        ...info,
        ...envVars,
        confirmationId,
        method,
        warning: !process.env.EMAIL_FAX_OFFICIALS
      }
    ),
    method,
    { signature: info.signature, idPhoto: info.idPhoto }
  )
}
