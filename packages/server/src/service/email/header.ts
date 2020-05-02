import { processEnvOrThrow } from '../../common'
import stripIndent from 'strip-indent'

const brandName = processEnvOrThrow('REACT_APP_BRAND_NAME')
const url = processEnvOrThrow('REACT_APP_URL')

export const header = () => stripIndent(`
  Dear Local Supervisor of Elections,

  I am writing to request an Absentee or Vote-by-Mail ballot through [${brandName}](${url}).
`)
