import Route, { Request, Response } from 'express';

const doctorsRoutes = Route();

doctorsRoutes.get('/', (request: Request, response: Response) => {
  return response.send({ message: 'doctor working' });
});

export default doctorsRoutes;
