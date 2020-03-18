import Express from 'express';
import Morgan from 'morgan';
import { Response } from 'express';
import { AddressInfo } from 'net';
import cors from 'cors'
import { registerExpressHandler } from '@tianhuil/simple-trpc/dist/handler/express'

import { processEnvOrThrow } from './common'
import letter from './service/letter'
import { VbmRpc } from './service/trpc';

const app = Express();

// logging middleware
app.use(Morgan('combined'));

app.use(cors())

app.get('/', (_, res: Response) => {
  res.send('Hello World');
});

app.get('/node-env', (_, res: Response) => {
  res.send(process.env.NODE_ENV);
});

if (process.env.DEBUG_LETTER) {
  app.use('/letter', letter)
}

registerExpressHandler(app, new VbmRpc())

// https://github.com/GoogleCloudPlatform/nodejs-getting-started/tree/master/1-hello-world
if (module === require.main) {
  const port = parseInt(processEnvOrThrow('SERVER_PORT'))
  const server = app.listen(port, () => {
    const port = (<AddressInfo>server.address()).port;
    console.log(`app listening on port ${port}`);
  });
}

export default app;
