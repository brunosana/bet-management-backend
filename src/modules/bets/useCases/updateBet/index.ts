import { MongodbBetsRepository } from '@modules/bets/repositories/implementations/MongodbBetsRepository';
import { MongodbUsersRepository } from '@modules/users/repositories/implementations/MongodbUsersRepository';

import { UpdateBetController } from './UpdateBetController';
import { UpdateBetService } from './UpdateBetService';

const betsRepository = MongodbBetsRepository.getInstance();
const usersRepository = MongodbUsersRepository.getIstance();
const updateBetService = new UpdateBetService(betsRepository, usersRepository);
const updateBetController = new UpdateBetController(updateBetService);

export { updateBetController };
