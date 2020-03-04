import * as mailgun from 'mailgun-js'
import { processEnvOrThrow } from '../common'

const domain = processEnvOrThrow('MG_PROTO_DOMAIN')

const mg = mailgun({
  apiKey: processEnvOrThrow('MG_PROTO_API_KEY'),
  domain
})
const data = {
	from: `Mailgun Sandbox <postmaster@${domain}>`,
	to: "tianhui.michael.li@gmail.com",
	subject: "Hello",
	text: "Testing some Mailgun awesomness!"
};
mg.messages().send(data, function (error, body) {
	console.log(body);
});

