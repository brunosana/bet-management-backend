import { IUser } from '@modules/users/models/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { AppError } from '@shared/errors/AppError';

class GetUserService {
    constructor(private usersRepository: IUsersRepository) {}

    public async execute(userId: string): Promise<IUser> {
        if (!userId) {
            throw new AppError('You must be logged to get a User', 401);
        }

        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        user.password = undefined;

        return user;
    }
}

export { GetUserService };
