import { ListOptionController } from './ListOptionController';
import { ListOptionService } from './ListOptionService';

const listOptionService = new ListOptionService();
const listOptionController = new ListOptionController(listOptionService);

export { listOptionController };
