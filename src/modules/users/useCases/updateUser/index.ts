import { UpdateUserController } from './UpdateUserController';
import { UpdateUserService } from './UpdateUserService';

const updateUserService = new UpdateUserService();
const updateUserController = new UpdateUserController(updateUserService);

export { updateUserController };
