import { FinishBetController } from './FinishBetController';
import { FinishBetService } from './FinishBetService';

const finishBetService = new FinishBetService();
const finishBetController = new FinishBetController(finishBetService);

export { finishBetController };
