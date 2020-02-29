import { Router, Request, Response } from 'express';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'Hello World'
  });
});

routes.get('/:name', (req: Request, res: Response) => {
  const name = req.params.name || 'GAE';
  res.send({
    message: `${name} is awesome!`
  });
});

routes.post('/', (req: Request, res: Response) => {
  try {
    const name = req.body.name || 'GAE';
    res.send({
      message: `${name} is awesome!`
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'some errors occured...'
    });
  }
});

export default routes;

