import { MongodbBetsRepository } from '@modules/bets/repositories/implementations/MongodbBetsRepository';

import { ListBetController } from './ListBetController';
import { ListBetService } from './ListBetService';

const betsRepository = MongodbBetsRepository.getInstance();
const listBetService = new ListBetService(betsRepository);
const listBetController = new ListBetController(listBetService);

export { listBetController };
