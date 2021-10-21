import dotenv from 'dotenv';
import Express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';

import { AppError } from '@shared/errors/AppError';

import { routes } from './routes';

const app = Express();

dotenv.config();

app.use(Express.json());

app.get('/', (request, response) => {
    return response.json({ message: 'Working' });
});

app.use('/api', routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'Error',
            message: err.message,
        });
    }
    console.error(err.message);

    return response.status(500).json({
        status: 'Error',
        message: 'Internal Server Error',
    });
});

export { app };
