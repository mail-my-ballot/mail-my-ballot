import Mustache from 'mustache'
import { processEnvOrThrow } from '../../common'
import { postscript } from './postscript'
import stripIndent from 'strip-indent'

const brandName = processEnvOrThrow('REACT_APP_BRAND_NAME')
const url = processEnvOrThrow('REACT_APP_URL')

const opening = stripIndent(`
  Dear Local Supervisor of Elections,

  I am writing to request an Absentee or Vote-by-Mail ballot through [${brandName}](${url}).
`)

const closing = postscript

// StateInfo
export const baseLetter = (layout: string, vars: any): string => {
  const view = {
    ...vars,
    opening,
    closing,
    body: () => {
      return (text: string, render: (x: string) => string) => {
        return render('{{opening}}\n' + text + '\n{{closing}}')
      }
    }
  }
  return Mustache.render(layout, view)
}

console.log(baseLetter('{{#body}}{{bar}}{{/body}}', { bar: 2 }))
