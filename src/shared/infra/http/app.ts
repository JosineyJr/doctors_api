import AppError from '@shared/errors/AppError';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { isCelebrateError } from 'celebrate';
import dotenv from 'dotenv';

import '@shared/infra/typeorm';
import '@shared/container';

import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';

import routes from './routes';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'TEST') {
  app.use(morgan('dev'));
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (isCelebrateError(err)) {
      const values = err.details.values();
      let { message } = values.next().value.details[0];
      message = message.replace('"', '').replace('"', '');

      return response.status(400).json({
        status: 'error',
        type: 'validation',
        message,
      });
    }

    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: err.message,
    });
  },
);

export default app;
