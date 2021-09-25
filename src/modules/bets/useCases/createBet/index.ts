import { MongodbBetsRepository } from '@modules/bets/repositories/implementations/MongodbBetsRepository';

import { CreateBetController } from './CreateBetController';
import { CreateBetService } from './CreateBetService';

const betsRepository = new MongodbBetsRepository();
const createBetService = new CreateBetService(betsRepository);
const createBetController = new CreateBetController(createBetService);

export { createBetController };
