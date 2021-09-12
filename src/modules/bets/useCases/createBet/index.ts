import { CreateBetController } from './CreateBetController';
import { CreateBetService } from './CreateBetService';

const createBetService = new CreateBetService();
const createBetController = new CreateBetController(createBetService);

export { createBetController };
