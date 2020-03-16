import { FloridaInfo } from "../../common";
import { EmailData } from "../mg";
import stripIndent from 'strip-indent'
import { floridaContacts } from "../contact/florida";

export const toEmailData = (
  {
    state,
    name,
    birthdate,
    email,
    uspsAddress,
    mailingAddress,
    county,
  }: FloridaInfo
): EmailData => {
  const electionsEmail = floridaContacts[county].email
  if (!electionsEmail) throw Error(`No email for ${county}, ${state}`)

  const to = [
    email,
    electionsEmail,
  ]

  const md = stripIndent(`
  Dear County Supervisor of Elections,

  I am writing to request Vote By Mail for all elections.  Below are my voter registration details:

  - Name: **${name}**
  - Voter Registration Address: **${uspsAddress}**
  - Birthdate: **${birthdate}**
  - Mailing Address: ${ mailingAddress ? `**${mailingAddress}**` : 'Same as egistration address' }

  Thank you in advance for your assistance.  If you have any questions, my email is ${email}.

  Sincerely,

  ${name}
  `)

  return {
    to,
    subject: 'Vote By Mail Request',
    md,
  }
}
