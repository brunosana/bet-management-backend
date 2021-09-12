import { ListBetController } from './ListBetController';
import { ListBetService } from './ListBetService';

const listBetService = new ListBetService();
const listBetController = new ListBetController(listBetService);

export { listBetController };
