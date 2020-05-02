import { MichiganInfo } from "../../common"
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
    mailingAddress,
  }: MichiganInfo
): string => {
  return stripIndent(`
  Per the instructions on the [secretary of state's website](https://www.michigan.gov/sos/0,4670,7-127-1633_8716_8728-21037--,00.html), I am requesting an absentee ballot for the upcoming Nov 03, 2020 eleciton.
  I am requesting to be added to the "permanent absentee voter list" for all upcoming elections.

    - Name: **${name}**
    - Voter Registration Address: **${uspsAddress}**
    - Birth Year: **${birthdate}**
    - Mailing Address: ${ mailingAddress ? `**${mailingAddress}**` : 'Same as registration address' }
    - Email: ${email}
    - Phone: **${phone}**
    - City / Township: **${city}**
    - County: **${county}**
  `)
}
