import { createOptionController } from '@modules/options/useCases/createOption';
import { listOptionController } from '@modules/options/useCases/listOption';
import { Router } from 'express';

import isAuthenticated from '../middlewares/isAuthenticated';

const optionsRouter = Router();

optionsRouter.get('/', async (request, response) => {
    await listOptionController.handle(request, response);
});

optionsRouter.use(isAuthenticated);

optionsRouter.post('/', async (request, response) => {
    await createOptionController.handle(request, response);
});

export { optionsRouter };
