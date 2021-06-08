import { Router, Request, Response } from 'express';

const cepsRoutes = Router();

cepsRoutes.get('/', (request: Request, response: Response) => {
  return response.send({ message: 'cep working' });
});

export default cepsRoutes;
