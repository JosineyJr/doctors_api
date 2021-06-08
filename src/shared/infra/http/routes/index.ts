import { Router } from 'express';
import doctorsRoutes from '@modules/doctors/infra/http/routes/doctorsRoutes';
import cepsRoutes from '@modules/CEP/infra/http/routes/cepsRoutes';
import specialtiesRoutes from '@modules/specialties/infra/http/routes/specialtiesRoutes';

const routes = Router();

routes.use('/doctor', doctorsRoutes);
routes.use('/cep', cepsRoutes);
routes.use('/specialty', specialtiesRoutes);

export default routes;
