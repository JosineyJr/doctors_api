import Route from 'express';
import doctorsRoutes from '@modules/doctors/infra/http/routes/doctorsRoutes';

const routes = Route();

routes.use('/doctor', doctorsRoutes);

export default routes;
