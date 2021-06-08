import { Router } from 'express';
import doctorsRoutes from '@modules/doctors/infra/http/routes/doctorsRoutes';
import cepsRoutes from '@modules/CEP/infra/http/routes/cepsRoutes';

const routes = Router();

routes.use('/doctor', doctorsRoutes);
routes.use('/cep', cepsRoutes);

export default routes;
