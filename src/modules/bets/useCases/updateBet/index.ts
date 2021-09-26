import { MongodbBetsRepository } from '@modules/bets/repositories/implementations/MongodbBetsRepository';
import { MongodbOptionsRepository } from '@modules/options/repositories/implementations/MongodbOptionsRepository';
import { MongodbUsersRepository } from '@modules/users/repositories/implementations/MongodbUsersRepository';

import { UpdateBetController } from './UpdateBetController';
import { UpdateBetService } from './UpdateBetService';

const betsRepository = MongodbBetsRepository.getInstance();
const usersRepository = MongodbUsersRepository.getIstance();
const optionsRepository = MongodbOptionsRepository.getInstance();
const updateBetService = new UpdateBetService(
    betsRepository,
    usersRepository,
    optionsRepository,
);
const updateBetController = new UpdateBetController(updateBetService);

export { updateBetController };
