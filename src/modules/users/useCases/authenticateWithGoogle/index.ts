import { MongodbUsersRepository } from '@modules/users/repositories/implementations/MongodbUsersRepository';
import { AuthenticateWithGoogleController } from './authenticateWithGoogleController';
import { AuthenticateWithGoogleService } from './authenticateWithGoogleService';

const usersRepository = MongodbUsersRepository.getIstance();
const authenticateUserService = new AuthenticateWithGoogleService(usersRepository);
const authenticateUserWithGoogle = new AuthenticateWithGoogleController(authenticateUserService);

export { authenticateUserWithGoogle };
