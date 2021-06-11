import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';
import SpecialtiesController from '@modules/specialties/infra/http/controller/SpecialtiesController';

const specialtiesRoutes = Router();
const specialtyController = new SpecialtiesController();

specialtiesRoutes.post(
  '/',
  celebrate({ [Segments.BODY]: { name: Joi.string().required() } }),
  specialtyController.create,
);

specialtiesRoutes.get('/', specialtyController.show);

export default specialtiesRoutes;
