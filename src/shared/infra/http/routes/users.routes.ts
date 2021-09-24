import { authenticateUserController } from '@modules/users/useCases/authenticateUser';
import { createUserController } from '@modules/users/useCases/createUser';
import { getUserController } from '@modules/users/useCases/getUser';
import { updateUserController } from '@modules/users/useCases/updateUser';
import { Router } from 'express';

import isAuthenticated from '../middlewares/isAuthenticated';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    await createUserController.handle(request, response);
});

usersRouter.post('/auth', async (request, response) => {
    await authenticateUserController.handle(request, response);
});

usersRouter.use(isAuthenticated);

usersRouter.get('/me', async (request, response) => {
    await getUserController.handle(request, response);
});

usersRouter.put('/', async (request, response) => {
    await updateUserController.handle(request, response);
});

export { usersRouter };
