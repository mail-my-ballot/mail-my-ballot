import marked from 'marked'
import nunjucks from 'nunjucks'

import { processEnvOrThrow, StateInfo } from '../../common'

nunjucks.configure(__dirname + '/views', {
  autoescape: true,
  noCache: !!process.env.NUNJUNKS_DISABLE_CACHE
})

export class Letter {
  md: string
  html: string

  constructor(md: string) {
    this.md = md
    this.html = marked(md)
  }
}

const envVars = {
  brandName: processEnvOrThrow('REACT_APP_BRAND_NAME'),
  brandUrl: processEnvOrThrow('REACT_APP_URL'),
  feedbackEmail: processEnvOrThrow('REACT_APP_FEEDBACK_ADDR'),
  electionsEmail: processEnvOrThrow('REACT_APP_ELECTION_OFFICIAL_ADDR'),
  election: processEnvOrThrow('REACT_APP_ELECTION_AND_DATE'),
}

const toTemplate = (info: StateInfo): string | null => {
  switch(info.state) {
    case 'Florida': return 'Florida.md'
    case 'Michigan': return 'Michigan.md'
    case 'Georgia': return 'Georgia.md'
    case 'Wisconsin': return 'Wisconsin.md'
    case 'Nebraska': return 'Nebraska.md'
    default: return null
  }
}

export const toLetter = (info: StateInfo, confirmationId: string): Letter | null => {
  const template = toTemplate(info)
  if (!template) return null
  return new Letter(
    nunjucks.render(template, { ...info, ...envVars, confirmationId })
  )
}
