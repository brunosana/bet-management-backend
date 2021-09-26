import { MongodbBetsRepository } from '@modules/bets/repositories/implementations/MongodbBetsRepository';
import { MongodbOptionsRepository } from '@modules/options/repositories/implementations/MongodbOptionsRepository';
import { MongodbUsersRepository } from '@modules/users/repositories/implementations/MongodbUsersRepository';

import { CreateBetController } from './CreateBetController';
import { CreateBetService } from './CreateBetService';

const betsRepository = MongodbBetsRepository.getInstance();
const usersRepository = MongodbUsersRepository.getIstance();
const optionsRepository = MongodbOptionsRepository.getInstance();
const createBetService = new CreateBetService(
    betsRepository,
    usersRepository,
    optionsRepository,
);
const createBetController = new CreateBetController(createBetService);

export { createBetController };
