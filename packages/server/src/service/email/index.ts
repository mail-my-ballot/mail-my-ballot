import marked = require('marked')

import { StateInfo, emailOfficials } from "../../common"
import { EmailData } from "../mg"
import * as Florida from './florida'
import * as Michigan from './michigan'
import * as Georgia from './georgia'
import * as Wisconsin from './wisconsin'
import { footer } from "./footer"
import { header } from "./header"

const toLetterBody = (info: StateInfo): string | null => {
  switch(info.state) {
    case 'Florida': return Florida.toLetterBody(info)
    case 'Michigan': return Michigan.toLetterBody(info)
    case 'Georgia': return Georgia.toLetterBody(info)
    case 'Wisconsin': return Wisconsin.toLetterBody(info)
    default: return null
  }
}

export class Letter {
  md: string
  html: string

  constructor(md: string) {
    this.md = md
    this.html = marked(md)
  }
}

const toLetter = (info: StateInfo, confirmationId: string): Letter | null => {
  const letterBody = toLetterBody(info)

  if (!letterBody) return null
  return new Letter(
    [
      header(),
      letterBody,
      footer(info, confirmationId),
    ].join('\n')
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
