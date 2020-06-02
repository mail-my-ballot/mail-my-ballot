import { sendSignupEmail } from './mg'
import { Letter } from './letter'

if (process.env.DEV_EMAIL) {
  sendSignupEmail(
    new Letter(
      '#Hi',
      { stateMethod: 'email', emails: ['bob@gmail.com'], faxes: [] }
    ),
    process.env.DEV_EMAIL,
    []
  ).then(
    (value) => console.log(value)
  )
}
