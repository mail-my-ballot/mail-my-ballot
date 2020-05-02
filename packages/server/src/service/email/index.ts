import marked from 'marked'
import nunjucks from 'nunjucks'

import { StateInfo, emailOfficials, processEnvOrThrow } from "../../common"
import { EmailData } from "../mg"

nunjucks.configure(__dirname + '/views', {
  autoescape: true,
  noCache: !!processEnvOrThrow('NUNJUNKS_DISABLE_CACHE')
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
}

const toTemplate = (info: StateInfo): string | null => {
  switch(info.state) {
    case 'Florida': return 'Florida.md'
    case 'Michigan': return 'Michigan.md'
    case 'Georgia': return 'Georgia.md'
    case 'Wisconsin': return 'Wisconsin.md'
    default: return null
  }
}

const toLetter = (info: StateInfo, confirmationId: string): Letter | null => {
  const template = toTemplate(info)
  if (!template) return null
  return new Letter(
    nunjucks.render(template, { ...info, ...envVars, confirmationId })
  )
}

interface Options {
  forceEmailOfficials: boolean
}

const defaultOptions = {
  forceEmailOfficials: false
}

export const toEmailData = (
  info: StateInfo,
  confirmationId: string,
  officialEmails: string[],
  { forceEmailOfficials }: Options = defaultOptions
): EmailData | null => {
  const letter = toLetter(info, confirmationId)
  if (!letter) return null

  const emailData = {
    to: [info.email],
    subject: 'Vote By Mail Request',
    md: letter.md,
    html: letter.html,
  }

  if (emailOfficials() || forceEmailOfficials) {
    emailData.to = [...emailData.to, ...officialEmails]
  }
  return emailData
}
