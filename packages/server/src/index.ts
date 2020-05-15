import Express from 'express'
import Morgan from 'morgan'
import { Response } from 'express'
import helmet from 'helmet'
import { AddressInfo } from 'net'
import cors from 'cors'
import { registerExpressHandler } from '@tianhuil/simple-trpc/dist/handler/express'

import { processEnvOrThrow } from './common'
import { VbmRpc } from './service/trpc'
import { registerPassportEndpoints } from './service/org'

const app = Express()

// logging middleware
app.use(Morgan('combined'))
app.use(helmet())
app.use('/static', Express.static(__dirname + '/static'))
app.use(cors({ origin: true }))

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.get('/_ah/warmup', (_, res) => {
  res.send('Warmup successful')
})

app.get('/', (_, res: Response) => {
  res.render('index')
})

registerExpressHandler(app, new VbmRpc())
registerPassportEndpoints(app)

// https://github.com/GoogleCloudPlatform/nodejs-getting-started/tree/master/1-hello-world
if (module === require.main) {
  // Google supplies PORT for the server (although it's now 8081, not 8080)
  // https://cloud.google.com/appengine/docs/flexible/nodejs/runtime#environment_variables
  // However, create react app server listens on PORT, so use DEV_SERVER_PORT in dev to avoid collision
  // On deployed instances (staging / production), use PORT
  // https://github.com/facebook/create-react-app/issues/3513
  const port = parseInt(process.env.PORT || processEnvOrThrow('DEV_SERVER_PORT'))
  const server = app.listen(port, () => {
    const port = (server.address() as AddressInfo).port
    console.log(`app listening on port ${port}`)
  })
}

export default app
