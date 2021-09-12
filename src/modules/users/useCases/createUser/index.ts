import { CreateUserController } from './CreateUserController';
import { CreateUserService } from './CreateUserService';

const createUserService = new CreateUserService();
const createUserController = new CreateUserController(createUserService);

export { createUserController };
