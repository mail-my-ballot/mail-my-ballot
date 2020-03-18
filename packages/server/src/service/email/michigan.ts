import { MichiganInfo } from "../../common";
import { EmailData } from "../mg";
import stripIndent from 'strip-indent'
import { search } from "../contact/michigan";

export const toEmailData = (
  {
    state,
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
  const electionsEmail = search(county, city)?.email
  if (!electionsEmail) throw Error(`No email for ${city}, ${county}, ${state}`)

  const to = [email, electionsEmail]

  const md = stripIndent(`
  Dear Elections Official,

  I am writing to request Vote By Mail for all elections.  Below are my voter registration details:

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
    to,
    subject: 'Vote By Mail Request',
    md,
  }
}
