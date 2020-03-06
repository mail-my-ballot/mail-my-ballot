import { sendEmail } from './mg'

sendEmail(
	"tianhui.michael.li@gmail.com",
	"Hello",
	"**This is a test**",
).then(
  (value) => console.log(value)
)
