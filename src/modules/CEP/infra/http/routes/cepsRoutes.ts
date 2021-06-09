import { Router, Request, Response } from 'express';

const cepsRoutes = Router();

cepsRoutes.get('/', async (request: Request, response: Response) => {
  return response.send({ message: '' });
});

export default cepsRoutes;
