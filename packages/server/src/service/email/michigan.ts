import { MichiganInfo, processEnvOrThrow } from "../../common"
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
    birthyear,
    mailingAddress,
    signature,
  }: MichiganInfo
): EmailData => {
  const brandName = processEnvOrThrow('REACT_APP_BRAND_NAME')
  const url = processEnvOrThrow('REACT_APP_URL')

  const md = stripIndent(`
  Dear Elections Official,

  I am writing to request an Absentee or Vote-by-Mail ballot through [${brandName}](${url}).
  I am requesting to be added to the "permanent absentee voter list" for all upcoming elections.
  Below are my voter registration details:

  - Name: **${name}**
  - Voter Registration Address: **${uspsAddress}**
  - Birth Year: **${birthyear}**
  - Mailing Address: ${ mailingAddress ? `**${mailingAddress}**` : 'Same as registration address' }
  - Email: ${email}
  - Phone: **${phone}**
  - City / Township: **${city}**
  - County: **${county}**

  Thank you in advance for your assistance.  If you have any questions, my email is ${email}.

  Sincerely,

  ${name} (Signature Below)

  <img src="${signature}">
  `)

  return {
    to: [email],
    subject: 'Vote By Mail Request',
    md,
  }
}
