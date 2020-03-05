import * as Express from 'express';
import * as Morgan from 'morgan';
import { Request, Response } from 'express';
import { AddressInfo } from 'net';
import * as cors from 'cors'

import { processEnvOrThrow } from './common'

import { VbmRpc } from './service/trpc';
import { registerExpressHandler } from '@tianhuil/simple-trpc/dist/handler/express'

const app = Express();

// logging middleware
app.use(Morgan('combined'));

app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

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
