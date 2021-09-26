import { MongodbUsersRepository } from '@modules/users/repositories/implementations/MongodbUsersRepository';

import { AuthenticateUserController } from './AuthenticateUserController';
import { AuthenticateUserService } from './AuthenticateUserService';

const usersRepository = MongodbUsersRepository.getIstance();
const authenticateUserService = new AuthenticateUserService(usersRepository);
const authenticateUserController = new AuthenticateUserController(
    authenticateUserService,
);

export { authenticateUserController };
