import { MongodbOptionsRepository } from '@modules/options/repositories/implementations/MongodbOptionsRepository';

import { ListOptionController } from './ListOptionController';
import { ListOptionService } from './ListOptionService';

const optionsRepository = MongodbOptionsRepository.getInstance();
const listOptionService = new ListOptionService(optionsRepository);
const listOptionController = new ListOptionController(listOptionService);

export { listOptionController };
