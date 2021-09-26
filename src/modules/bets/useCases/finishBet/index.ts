import { MongodbBetsRepository } from '@modules/bets/repositories/implementations/MongodbBetsRepository';
import { MongodbUsersRepository } from '@modules/users/repositories/implementations/MongodbUsersRepository';

import { FinishBetController } from './FinishBetController';
import { FinishBetService } from './FinishBetService';

const betsRepository = MongodbBetsRepository.getInstance();
const usersRepository = MongodbUsersRepository.getIstance();
const finishBetService = new FinishBetService(betsRepository, usersRepository);
const finishBetController = new FinishBetController(finishBetService);

export { finishBetController };
