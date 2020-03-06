import { FloridaInfo } from "../../common"
import stripIndent from 'strip-indent'

export const md = (
  {
    name,
    birthdate,
    email,
    uspsAddress,
  }: FloridaInfo
): string => {
  return stripIndent(`
  Dear County Supervisor of Elections,

  I am writing to request Vote By Mail for all elections.  Below are my voter registration details:

  - Name: **${name}**
  - Address: **${uspsAddress}**
  - Birthdate: **${birthdate}**

  Thank you in advance for your assistance.  If you have any questions, my email is ${email}

  Sincerely,

  ${name}
  `)
}
