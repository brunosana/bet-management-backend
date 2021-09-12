import { AuthenticateUserController } from './AuthenticateUserController';
import { AuthenticateUserService } from './AuthenticateUserService';

const authenticateUserService = new AuthenticateUserService();
const authenticateUserController = new AuthenticateUserController(
    authenticateUserService,
);

export { authenticateUserController };
