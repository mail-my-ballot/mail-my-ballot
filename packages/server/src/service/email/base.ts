import Mustache from 'mustache'
import { StateInfo, processEnvOrThrow } from '../../common'
import { postscript } from './postscript'

const brandName = processEnvOrThrow('REACT_APP_BRAND_NAME')
const url = processEnvOrThrow('REACT_APP_URL')

const opening = stripIndent(`
  Dear County Supervisor of Elections,

  I am writing to request an Absentee or Vote-by-Mail ballot through [${brandName}](${url}).
`)

const closing = postscript

const layout = stripIndent(`
{{opening}}
{{body}}
{{closing}}
`)

const baseLetter = (body: string, vars: StateInfo): string => {
  const view = {
    ...vars,
    body: () => {
      return (text: string, render: (x: string) => string) => {
        render(text)
      }
    }
  }
  Mustache.render(layout, view)
}
