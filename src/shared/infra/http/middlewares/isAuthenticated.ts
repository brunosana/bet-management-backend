import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError('Missing token property');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, process.env.SECRET);

        const { sub } = decoded as ITokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch (err) {
        if (err.message === 'jwt expired') {
            throw new AppError('You must be logged to access this route', 401);
        }
        throw new Error('Invalid JWT Token');
    }
}
