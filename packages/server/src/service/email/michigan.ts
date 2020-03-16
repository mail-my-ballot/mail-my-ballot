import { MichiganInfo } from "../../common";
import { EmailData } from "../mg";
import stripIndent from 'strip-indent'
import { search } from "../contact/Michigan";

export const toEmailData = (
  {
    name,
    birthyear,
    email,
    uspsAddress,
    county,
    city,
  }: MichiganInfo
): EmailData => {
  const to = [
    email,
    search(county, city),
  ]

  const md = stripIndent(`
  Dear Elections Official,

  I am writing to request Vote By Mail for all elections.  Below are my voter registration details:

  ${name}
  `)

  return {
    to,
    subject: 'Vote By Mail Request',
    md,
  }
}
