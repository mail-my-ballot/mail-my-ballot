import { WisconsinInfo, processEnvOrThrow } from "../../common"
import { EmailData } from "../mg"
import stripIndent from 'strip-indent'

export const toEmailData = (
  {
    name,
    uspsAddress,
    email,
    phone,
    county,
    city,
    birthdate,
    ballotMethod,
    mailingAddress,
  }: WisconsinInfo
): EmailData => {
  const brandName = processEnvOrThrow('REACT_APP_BRAND_NAME')
  const url = processEnvOrThrow('REACT_APP_URL')

  // https://sos.ga.gov/admin/uploads/Absentee_Voting_Guide_20142.pdf

  const md = stripIndent(`
  Dear Election Official,

  I am writing to request an Absentee or Vote-by-Mail ballot through [${brandName}](${url}), following the requirements laid out on the [Secretary of State's website](https://elections.wi.gov/sites/elections.wi.gov/files/2019-02/Faxing%20or%20Emailing%20Absentee%20Ballots.pdf).
  I am reqeusting this for the end of the calendar year.
  
  Below are my voter registration details:

  - Name: **${name}**
  - Birth Year: **${birthdate}**
  - Voter Registration Address: **${uspsAddress}**
  - Mailing Address: ${ mailingAddress ? `**${mailingAddress}**` : 'Same as registration address' }
  - Email: ${email}
  - Phone: **${phone}**
  - City: **${city}**
  - County: **${county}**
  - Ballot Method: **${ballotMethod}**

  Thank you in advance for your assistance.  If you have any questions, please reply to this email.

  Sincerely,

  ${name}
  `)

  return {
    to: [email],
    subject: 'Vote By Mail Request',
    md,
  }
}
