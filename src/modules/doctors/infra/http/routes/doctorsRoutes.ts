import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import validations from '@config/valitadions';

import DoctorsController from '../controllers/DoctorsController';

const doctorsRoutes = Router();
const doctorsController = new DoctorsController();

doctorsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      crm: Joi.string().regex(validations.crm),
      cellPhone: Joi.string().regex(validations.cellPhone),
      landline: Joi.string().regex(validations.landline),
      cep: Joi.string().regex(validations.cep),
      specialties: Joi.array().items(Joi.string()).min(2),
    },
  }),
  doctorsController.create,
);

doctorsRoutes.get('/', doctorsController.show);

doctorsRoutes.get(
  '/:param',
  celebrate({
    [Segments.PARAMS]: {
      param: Joi.string().required(),
    },
  }),
  doctorsController.index,
);

export default doctorsRoutes;
