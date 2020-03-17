import { sendEmail } from './mg'

if (process.env.DEV_EMAIL) {
  sendEmail({
    to: [process.env.DEV_EMAIL],
    subject: "Hello",
    md: "**This is a test**",
  }).then(
    (value) => console.log(value)
  )
  
}
