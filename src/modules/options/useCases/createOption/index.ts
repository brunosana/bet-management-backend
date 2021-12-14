import { MongodbOptionsRepository } from '@modules/options/repositories/implementations/MongodbOptionsRepository';

import { CreateOptionController } from './CreateOptionController';
import { CreateOptionService } from './CreateOptionService';

const optionsRepository = MongodbOptionsRepository.getInstance();
const createOptionService = new CreateOptionService(optionsRepository);
const createOptionController = new CreateOptionController(createOptionService);

export { createOptionController };
