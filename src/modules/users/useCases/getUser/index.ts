import { MongodbUsersRepository } from '@modules/users/repositories/implementations/MongodbUsersRepository';

import { GetUserController } from './GetUserController';
import { GetUserService } from './GetUserService';

const usersRepository = MongodbUsersRepository.getIstance();
const getUserService = new GetUserService(usersRepository);
const getUserController = new GetUserController(getUserService);

export { getUserController };
