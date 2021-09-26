import { IUser } from '@modules/users/models/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
    email: IUser['email'];
    password: IUser['password'];
}

interface IResponse {
    user: IUser;
    token: string;
}

class AuthenticateUserService {
    constructor(private usersRepository: IUsersRepository) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        if (!email) {
            throw new AppError('Email required');
        }
        if (!password) {
            throw new AppError('Password required');
        }
        if (password.length < 8) {
            throw new AppError('Passowrd must be at more than 8 characters');
        }

        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Email or Password incorrect');
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError('Email or Password incorrect');
        }

        const token = sign({}, process.env.SECRET, {
            subject: user.id,
            expiresIn: '1d',
        });

        user.password = undefined;

        return { user, token };
    }
}

export { AuthenticateUserService };
