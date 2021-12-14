import { IUser } from '@modules/users/models/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { sign } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
    id: string;
    email: string;
    name: string;
}

interface IResponse {
    user: IUser;
    token: string;
}

class AuthenticateWithGoogleService {
    constructor(private usersRepository: IUsersRepository) {}

    public async execute({ id, name, email }: IRequest): Promise<IResponse> {
        if (!id) {
            throw new AppError('Missing Id Property');
        }

        if (!name) {
            throw new AppError('Missing name Property');
        }

        if (!email) {
            throw new AppError('Missing name Property');
        }

        const findUser = await this.usersRepository.findByEmail(email);

        if (!findUser) {
            const user = await this.usersRepository.createGoogleUser({
                email,
                name,
                googleId: id,
            });

            const token = sign({}, process.env.SECRET, {
                subject: user.id,
                expiresIn: '1d',
            });

            return { user, token };
        }

        const token = sign({}, process.env.SECRET, {
            subject: findUser.id,
            expiresIn: '1d',
        });

        return { user: findUser, token };
    }
}

export { AuthenticateWithGoogleService };
