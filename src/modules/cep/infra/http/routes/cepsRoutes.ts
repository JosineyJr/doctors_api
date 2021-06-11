import { Router } from 'express';
import CepsController from '@modules/cep/infra/http/controllers/CepsController';
import { Joi, Segments, celebrate } from 'celebrate';
import validations from '@config/valitadions';

const cepsRoutes = Router();
const cepsController = new CepsController();

cepsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cep: Joi.string().regex(validations.cep).required(),
    },
  }),
  cepsController.register,
);

cepsRoutes.get('/', cepsController.show);

export default cepsRoutes;
