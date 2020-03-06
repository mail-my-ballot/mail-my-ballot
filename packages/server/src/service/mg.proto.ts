import { sendMdEmail } from './mg'

sendMdEmail({
	to: "tianhui.michael.li@gmail.com",
	subject: "Hello",
	md: "**This is a test**",
}).then(
  (value) => console.log(value)
)
