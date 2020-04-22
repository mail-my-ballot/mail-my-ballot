import stripIndent from 'strip-indent'
import { processEnvOrThrow } from '../../common'

const brandName = processEnvOrThrow('REACT_APP_BRAND_NAME')
const url = processEnvOrThrow('REACT_APP_BRAND_NAME')
const feedbackEmail = processEnvOrThrow('REACT_APP_FEEDBACK_ADDR')
const electionsEmail = processEnvOrThrow('REACT_APP_ELECTION_OFFICIAL_ADDR')

const brandLink = `[${brandName}](${url})`

export const postscript = (confirmationId: string): string => stripIndent(`

  ${brandLink} is a [Vote at Home](https://voteathome.org/) project. Vote at Home is a non-partisan 501(c)3 that supports vote by mail.

  Questions? Feedback?
  - Voter Email: [${feedbackEmail}](${feedbackEmail}).
  - Election Official Email: [${electionsEmail}](${electionsEmail}).

  The confirmation id is ${confirmationId}
`)
