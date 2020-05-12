import { sendEmail } from './mg'
import { Letter } from './letter'

if (process.env.DEV_EMAIL) {
  sendEmail(
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
