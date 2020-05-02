import { FloridaInfo } from "../../common"
import stripIndent from 'strip-indent'

export const toLetterBody = (
  {
    name,
    birthdate,
    uspsAddress,
    mailingAddress,
  }: FloridaInfo
): string => {
  return stripIndent(`
    As per [state guidelines](https://dos.myflorida.com/elections/for-voters/voting/vote-by-mail/), I am applying for all elections through the end of the calendar year for the second ensuing regularly scheduled general election.
    Below are my voter registration details:

    - Name: **${name}**
    - Voter Registration Address: **${uspsAddress}**
    - Birthdate: **${birthdate}**
    - Mailing Address: ${ mailingAddress ? `**${mailingAddress}**` : 'Same as registration address' }
  `)
}
