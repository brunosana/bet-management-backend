import { MongodbBetsRepository } from '@modules/bets/repositories/implementations/MongodbBetsRepository';

import { ListBetController } from './ListBetController';
import { ListBetService } from './ListBetService';

const mongodbBetsRepository = MongodbBetsRepository.getInstance();
const listBetService = new ListBetService(mongodbBetsRepository);
const listBetController = new ListBetController(listBetService);

export { listBetController };
