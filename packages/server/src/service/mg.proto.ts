import { toSignupEmailData, mg } from './mg'
import { Letter } from './letter'

if (process.env.DEV_EMAIL) {
  const emailData = toSignupEmailData(
    new Letter(
      'Test Subject',
      '# A Test Email xyz',
      { stateMethod: 'email', emails: ['bob@gmail.com'], faxes: [] }
    ),
    process.env.DEV_EMAIL,
    []
  )
  mg.messages().send({
    ...emailData,
    'h:Reply-To': 'bob@gmail.com,alice@gmail.com'
  }).then(
    (value) => console.log(value)
  )
  console.log(`Emailed ${process.env.DEV_EMAIL}`)
}
