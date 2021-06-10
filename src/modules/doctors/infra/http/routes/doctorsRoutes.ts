import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import DoctorsController from '../controllers/DoctorsController';

const doctorsRoutes = Router();
const doctorsController = new DoctorsController();

doctorsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      crm: Joi.string().regex(RegExp('^\\d{7}$')),
      cellPhone: Joi.string().regex(RegExp('^\\d{11,12}$')),
      cep: Joi.string().regex(RegExp('^\\d{8}$')),
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
