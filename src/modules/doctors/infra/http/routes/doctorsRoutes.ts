import { Router, Request, Response } from 'express';

const doctorsRoutes = Router();

doctorsRoutes.get('/', (request: Request, response: Response) => {
  return response.send({ message: 'doctor working' });
});

export default doctorsRoutes;
