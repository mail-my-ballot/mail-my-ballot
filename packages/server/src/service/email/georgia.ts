import { GeorgiaInfo } from "../../common"
import stripIndent from 'strip-indent'

export const toLetterBody = (
  {
    name,
    uspsAddress,
    email,
    phone,
    county,
    birthdate,
    mailingAddress,
    electionType,
    electionDate,
  }: GeorgiaInfo
): string => {
  return stripIndent(`
    Per the requirements laid out on the [Secretary of State's website](https://sos.ga.gov/admin/uploads/Absentee_Voting_Guide_20142.pdf).
  
    - Name: **${name}**
    - Birth Year: **${birthdate}**
    - Voter Registration Address: **${uspsAddress}**
    - Mailing Address: ${ mailingAddress ? `**${mailingAddress}**` : 'Same as registration address' }
    - Email: ${email}
    - Phone: **${phone}**
    - County: **${county}**
    - Election: **${electionType}**
    - Election Date: **${electionDate}**
  `)
}
