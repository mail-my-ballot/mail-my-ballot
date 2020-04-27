import { FloridaInfo, processEnvOrThrow } from "../../common"
import { EmailData } from "../mg"
import stripIndent from 'strip-indent'

export const toEmailData = (
  {
    name,
    birthdate,
    email,
    uspsAddress,
    mailingAddress,
  }: FloridaInfo
): EmailData => {
  const brandName = processEnvOrThrow('REACT_APP_BRAND_NAME')
  const url = processEnvOrThrow('REACT_APP_URL')

  const md = stripIndent(`
  Dear County Supervisor of Elections,

  I am writing to request an Absentee or Vote-by-Mail ballot through [${brandName}](${url}).
  As per [state guidelines](https://dos.myflorida.com/elections/for-voters/voting/vote-by-mail/),
  I am applying for all elections through the end of the calendar year for the second ensuing regularly scheduled general election.
  Below are my voter registration details:

  - Name: **${name}**
  - Voter Registration Address: **${uspsAddress}**
  - Birthdate: **${birthdate}**
  - Mailing Address: ${ mailingAddress ? `**${mailingAddress}**` : 'Same as registration address' }

  Thank you in advance for your assistance.  If you have any questions, my email is ${email}.

  Sincerely,

  ${name}
  `)

  return {
    to: [email],
    subject: 'Vote By Mail Request',
    md,
  }
}
