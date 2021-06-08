import { Request, Response, Router } from 'express';

const specialtiesRoutes = Router();

specialtiesRoutes.get('/', (request: Request, response: Response) => {
  return response.send({ message: 'specialty working' });
});

export default specialtiesRoutes;
