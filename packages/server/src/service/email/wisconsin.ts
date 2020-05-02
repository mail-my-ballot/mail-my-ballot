import { WisconsinInfo } from "../../common"
import stripIndent from 'strip-indent'

export const toLetterBody = (
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
): string => {
  return stripIndent(`
  Following the instrucitons from the [Secretary of State's website](https://sos.ga.gov/admin/uploads/Absentee_Voting_Guide_20142.pdf), I am reqeusting this for the end of the calendar year.

    - Name: **${name}**
    - Birth Year: **${birthdate}**
    - Voter Registration Address: **${uspsAddress}**
    - Mailing Address: ${ mailingAddress ? `**${mailingAddress}**` : 'Same as registration address' }
    - Email: ${email}
    - Phone: **${phone}**
    - City: **${city}**
    - County: **${county}**
    - Ballot Method: **${ballotMethod}**
  `)
}
