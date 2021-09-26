import { DeleteBetController } from './DeleteBetController';
import { DeleteBetService } from './DeleteBetService';

const deleteBetService = new DeleteBetService();
const deleteBetController = new DeleteBetController(deleteBetService);

export { deleteBetController };
