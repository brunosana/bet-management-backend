import { User, IUser } from '@modules/users/models/User';
import { hash } from 'bcrypt';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
    name: IUser['name'];
    email: IUser['email'];
    password: IUser['password'];
}

class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<IUser> {
        if (!name) {
            throw new AppError('Name required');
        }
        if (!email) {
            throw new AppError('Email required');
        }
        if (!password) {
            throw new AppError('Password required');
        }
        if (password.length < 8) {
            throw new AppError('Password must be at more than 8 characters');
        }

        const checkIfEmailExists = await User.findOne({
            email: email.toLowerCase(),
        });

        if (checkIfEmailExists) {
            throw new AppError('Email in use');
        }

        const hashedPassword = await hash(password, 8);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (!user) {
            throw new AppError('User cant be created');
        }

        user.password = undefined;

        return user;
    }
}

export { CreateUserService };
