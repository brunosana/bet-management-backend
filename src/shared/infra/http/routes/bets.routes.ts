import { createBetController } from '@modules/bets/useCases/createBet';
import { deleteBetController } from '@modules/bets/useCases/deleteBet';
import { finishBetController } from '@modules/bets/useCases/finishBet';
import { listBetController } from '@modules/bets/useCases/listBet';
import { updateBetController } from '@modules/bets/useCases/updateBet';
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
betsRouter.put('/:id/finish', async (request, response) => {
    await finishBetController.handle(request, response);
});
betsRouter.put('/:id', async (request, response) => {
    await updateBetController.handle(request, response);
});
betsRouter.delete('/:id', async (request, response) => {
    await deleteBetController.handle(request, response);
});

export { betsRouter };
