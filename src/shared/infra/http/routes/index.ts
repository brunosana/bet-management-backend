import { Router } from 'express';

import { betsRouter } from './bets.routes';
import { optionsRouter } from './options.routes';
import { usersRouter } from './users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/options', optionsRouter);
routes.use('/bets', betsRouter);

export { routes };
