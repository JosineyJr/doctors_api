import AppError from '@shared/errors/AppError';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { isCelebrateError } from 'celebrate';

import '@shared/infra/typeorm';
import '@shared/container';

import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';

const app = express();
const port = 3031;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (request: Request, response: Response) => {
  return response.send({ ok: 'aqui' });
});

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

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
