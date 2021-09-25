import { MongodbBetsRepository } from '@modules/bets/repositories/implementations/MongodbBetsRepository';

import { DeleteBetController } from './DeleteBetController';
import { DeleteBetService } from './DeleteBetService';

const mongodbBetsRepository = new MongodbBetsRepository();
const deleteBetService = new DeleteBetService(mongodbBetsRepository);
const deleteBetController = new DeleteBetController(deleteBetService);

export { deleteBetController };
