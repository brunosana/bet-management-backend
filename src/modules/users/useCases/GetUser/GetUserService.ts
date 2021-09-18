import { User, IUser } from '@modules/users/models/User';

import { AppError } from '@shared/errors/AppError';

class GetUserService {
    public async execute(userId: string): Promise<IUser> {
        if (!userId) {
            throw new AppError('You must be logged to get a User', 401);
        }

        const user = await User.findOne({ id: userId });

        user.password = undefined;

        return user;
    }
}

export { GetUserService };
