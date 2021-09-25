import { MongodbBetsRepository } from '@modules/bets/repositories/implementations/MongodbBetsRepository';

import { FinishBetController } from './FinishBetController';
import { FinishBetService } from './FinishBetService';

const mongodbBetsRepository = MongodbBetsRepository.getInstance();
const finishBetService = new FinishBetService(mongodbBetsRepository);
const finishBetController = new FinishBetController(finishBetService);

export { finishBetController };
