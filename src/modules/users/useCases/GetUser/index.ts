import { GetUserController } from './GetUserController';
import { GetUserService } from './GetUserService';

const getUserService = new GetUserService();
const getUserController = new GetUserController(getUserService);

export { getUserController };
