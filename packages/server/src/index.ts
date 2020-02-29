import * as Express from 'express';
import * as Morgan from 'morgan';
import { AddressInfo } from 'net';

import DefaultRoutes from './defaultRoutes';

const App = Express();

// logging middleware
App.use(Morgan('combined'));

// my application routes
App.use(DefaultRoutes);

// https://github.com/GoogleCloudPlatform/nodejs-getting-started/tree/master/1-hello-world
if (module === require.main) {
  const server = App.listen(process.env.PORT || 8080, () => {
    const port = (<AddressInfo>server.address()).port;
    console.log(`App listening on port ${port}`);
  });
}

export default App;
