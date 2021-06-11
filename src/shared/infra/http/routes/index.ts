import { Router } from 'express';
import doctorsRoutes from '@modules/doctors/infra/http/routes/doctorsRoutes';
import cepsRoutes from '@modules/cep/infra/http/routes/cepsRoutes';
import specialtiesRoutes from '@modules/specialties/infra/http/routes/specialtiesRoutes';

const routes = Router();

routes.use('/doctors', doctorsRoutes);
routes.use('/cep', cepsRoutes);
routes.use('/specialties', specialtiesRoutes);

export default routes;
