import AppError from '@shared/errors/AppError';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const port = 3031;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (request: Request, response: Response) => {
    return response.send({ ok: 'aqui' });
});

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
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
