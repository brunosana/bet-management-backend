import { MongodbUsersRepository } from '@modules/users/repositories/implementations/MongodbUsersRepository';

import { CreateUserController } from './CreateUserController';
import { CreateUserService } from './CreateUserService';

const usersRepository = MongodbUsersRepository.getIstance();
const createUserService = new CreateUserService(usersRepository);
const createUserController = new CreateUserController(createUserService);

export { createUserController };
