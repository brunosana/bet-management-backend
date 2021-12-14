import { IUser } from '@modules/users/models/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { compare, hash } from 'bcrypt';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
    newUser: {
        email: string;
        name: string;
        password: string;
    };
    password?: string;
    userId: string;
}

class UpdateUserService {
    constructor(private usersRepository: IUsersRepository) {}

    public async execute({
        userId,
        newUser,
        password,
    }: IRequest): Promise<IUser> {
        if (!userId) {
            throw new AppError('You must be logged to update a User', 401);
        }

        if (!newUser) {
            throw new AppError('User required to update');
        }

        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found', 401);
        }

        if (userId !== user.id.toString()) {
            throw new AppError('Permission Denied', 401);
        }

        if (newUser.email && user.email !== newUser.email) {
            const emailExists = await this.usersRepository.findByEmail(
                newUser.email,
            );
            if (emailExists) {
                throw new AppError('Email already exists');
            }
            user.email = newUser.email;
        }

        if (password && newUser.password) {
            if (newUser.password.length < 8) {
                throw new AppError('Password must be at least 8 characters');
            }
            const passwordMatch = await compare(password, user.password);

            if (!passwordMatch) {
                throw new AppError("Password doesn't match", 401);
            }
            user.password = await hash(newUser.password, 8);
        }

        if (newUser.name) {
            user.name = newUser.name;
        }

        await this.usersRepository.save(user);

        user.password = undefined;

        return user;
    }
}

export { UpdateUserService };
