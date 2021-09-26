import { UpdateBetController } from './UpdateBetController';
import { UpdateBetService } from './UpdateBetService';

const updateBetService = new UpdateBetService();
const updateBetController = new UpdateBetController(updateBetService);

export { updateBetController };
