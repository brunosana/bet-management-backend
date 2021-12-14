import { CreateUserService } from '@modules/users/useCases/createUser/CreateUserService';

import { AppError } from '@shared/errors/AppError';

import { InMemoryUserRepository } from '../repositories/InMemoryUserRepository';

let usersRepository: InMemoryUserRepository;
let createUserService: CreateUserService;

describe('Create User', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUserRepository();
        createUserService = new CreateUserService(usersRepository);
    });

    it('Should be able to create a user', async () => {
        const user = {
            name: 'TestName',
            email: 'email@email.com',
            password: 'thisIsThePassword',
        };

        const userCreated = await createUserService.execute(user);

        expect(userCreated).toHaveProperty('id');
    });

    it('Should not be able to create a user with no email', async () => {
        try {
            const user = {
                name: 'TestName',
                email: undefined,
                password: 'thisIsThePassword',
            };

            await createUserService.execute(user);
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'Email required');
        }
    });

    it('Should not be able to create a user with no password', async () => {
        try {
            const user = {
                name: 'TestName',
                email: 'email@email.com',
                password: undefined,
            };

            await createUserService.execute(user);
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'Password required');
        }
    });

    it('Should not be able to create a user with email exists', async () => {
        try {
            const user = {
                name: 'TestName',
                email: 'email@email.com',
                password: 'thisIsThePassword',
            };

            await createUserService.execute(user);
            await createUserService.execute(user);
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'Email in use');
        }
        // .rejects.toBeInstanceOf(AppError)
    });

    it('Should not be able to create a user with short password', async () => {
        try {
            const user = {
                name: 'TestName',
                email: 'email@email.com',
                password: 'short',
            };

            await createUserService.execute(user);
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'Password must be at more than 8 characters',
            );
        }
    });
});
