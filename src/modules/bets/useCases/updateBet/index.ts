import { MongodbBetsRepository } from '@modules/bets/repositories/implementations/MongodbBetsRepository';

import { UpdateBetController } from './UpdateBetController';
import { UpdateBetService } from './UpdateBetService';

const mongodbBetsRepository = new MongodbBetsRepository();
const updateBetService = new UpdateBetService(mongodbBetsRepository);
const updateBetController = new UpdateBetController(updateBetService);

export { updateBetController };
