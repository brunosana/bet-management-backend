import { CreateOptionController } from './CreateOptionController';
import { CreateOptionService } from './CreateOptionService';

const createOptionService = new CreateOptionService();
const createOptionController = new CreateOptionController(createOptionService);

export { createOptionController };
