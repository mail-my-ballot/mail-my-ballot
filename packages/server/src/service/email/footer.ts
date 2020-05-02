import stripIndent from 'strip-indent'
import { processEnvOrThrow, StateInfo } from '../../common'

const brandName = processEnvOrThrow('REACT_APP_BRAND_NAME')
const url = processEnvOrThrow('REACT_APP_BRAND_NAME')
const feedbackEmail = processEnvOrThrow('REACT_APP_FEEDBACK_ADDR')
const electionsEmail = processEnvOrThrow('REACT_APP_ELECTION_OFFICIAL_ADDR')

const brandLink = `[${brandName}](${url})`

const toSignature = ({name, signature}: StateInfo) => {
  if (signature) {
    return stripIndent(`
      Sincerely,

      ${name} (Signature Attached)

      <img src="${signature}">
    `)
  } else {
    return stripIndent(`
      Sincerely,

      ${name}
    `)
  }
}

export const footer = (info: StateInfo, confirmationId: string): string => {
  const { email } = info
  const closing = stripIndent(`
    Thank you in advance for your help.  If you have any questions, please feel free to reach out at [${email}](${email}).
  `)
  const signature = toSignature(info)
  const postscript = stripIndent(`
    <font style='font-size:75%;'>

    ${brandLink} is a Vote at Home project.
    [Vote at Home](https://voteathome.org/) is a non-partisan 501(c)3 that supports vote by mail.

    Questions? Feedback? email us at [${feedbackEmail}](${feedbackEmail}).

    **Elections Officials**: do you want a direct, secure access to your applications?  Email us at [${electionsEmail}](${electionsEmail}) to become an the Election Offical Beta User.

    Confirmation id: ${confirmationId}

    </font>
  `)

  return [closing, signature, postscript].join('\n')
}

