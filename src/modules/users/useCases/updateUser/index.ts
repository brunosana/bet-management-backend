import { MongodbUsersRepository } from '@modules/users/repositories/implementations/MongodbUsersRepository';

import { UpdateUserController } from './UpdateUserController';
import { UpdateUserService } from './UpdateUserService';

const usersRepository = MongodbUsersRepository.getIstance();
const updateUserService = new UpdateUserService(usersRepository);
const updateUserController = new UpdateUserController(updateUserService);

export { updateUserController };
