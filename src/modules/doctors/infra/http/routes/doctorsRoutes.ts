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
      crm: Joi.string().regex(validations.crm).required(),
      cellPhone: Joi.string().regex(validations.cellPhone).required(),
      landline: Joi.string().regex(validations.landline),
      cep: Joi.string().regex(validations.cep).required(),
      specialties: Joi.array().items(Joi.string()).min(2).required(),
    },
  }),
  doctorsController.create,
);

doctorsRoutes.get('/', doctorsController.show);

doctorsRoutes.get(
  '/:param',
  celebrate({
    [Segments.PARAMS]: {
      param: Joi.string().min(7).required(),
    },
  }),
  doctorsController.index,
);

doctorsRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      crm: Joi.string().regex(validations.crm),
      cellPhone: Joi.string().regex(validations.cellPhone),
      landline: Joi.string().regex(validations.landline),
      cep: Joi.string().regex(validations.cep),
      specialties: Joi.array().items(Joi.string()).min(2),
    },
  }),
  doctorsController.update,
);

export default doctorsRoutes;
