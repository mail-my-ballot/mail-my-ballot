import * as Express from 'express';
import * as Morgan from 'morgan';
import { Request, Response } from 'express';
import { AddressInfo } from 'net';
import * as cors from 'cors'

import { processEnvOrThrow } from '@vbm/common'

import { VbmRpc } from './service/trpc';
import { registerExpressHandler } from '@tianhuil/simple-trpc/dist/handler/express'

const App = Express();

// logging middleware
App.use(Morgan('combined'));

App.use(cors())

App.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

registerExpressHandler(App, new VbmRpc())

// https://github.com/GoogleCloudPlatform/nodejs-getting-started/tree/master/1-hello-world
if (module === require.main) {
  const port = parseInt(processEnvOrThrow('SERVER_PORT'))
  const server = App.listen(port, () => {
    const port = (<AddressInfo>server.address()).port;
    console.log(`App listening on port ${port}`);
  });
}

export default App;
