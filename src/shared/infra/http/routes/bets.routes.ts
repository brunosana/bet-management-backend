import { createBetController } from '@modules/bets/useCases/createBet';
import { listBetController } from '@modules/bets/useCases/listBet';
import { Router } from 'express';

import isAuthenticated from '../middlewares/isAuthenticated';

const betsRouter = Router();

betsRouter.use(isAuthenticated);

betsRouter.post('/', async (request, response) => {
    await createBetController.handle(request, response);
});
betsRouter.get('/', async (request, response) => {
    await listBetController.handle(request, response);
});

export { betsRouter };
