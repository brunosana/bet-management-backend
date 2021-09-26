import { MongodbBetsRepository } from '@modules/bets/repositories/implementations/MongodbBetsRepository';
import { MongodbUsersRepository } from '@modules/users/repositories/implementations/MongodbUsersRepository';

import { DeleteBetController } from './DeleteBetController';
import { DeleteBetService } from './DeleteBetService';

const betsRepository = MongodbBetsRepository.getInstance();
const usersRepository = MongodbUsersRepository.getIstance();
const deleteBetService = new DeleteBetService(betsRepository, usersRepository);
const deleteBetController = new DeleteBetController(deleteBetService);

export { deleteBetController };
