import { MongodbBetsRepository } from '@modules/bets/repositories/implementations/MongodbBetsRepository';
import { MongodbUsersRepository } from '@modules/users/repositories/implementations/MongodbUsersRepository';

import { CreateBetController } from './CreateBetController';
import { CreateBetService } from './CreateBetService';

const betsRepository = MongodbBetsRepository.getInstance();
const usersRepository = MongodbUsersRepository.getIstance();
const createBetService = new CreateBetService(betsRepository, usersRepository);
const createBetController = new CreateBetController(createBetService);

export { createBetController };
