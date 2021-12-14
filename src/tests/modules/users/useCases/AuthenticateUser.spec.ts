import { AuthenticateUserService } from '@modules/users/useCases/authenticateUser/AuthenticateUserService';
import { CreateUserService } from '@modules/users/useCases/createUser/CreateUserService';

import { AppError } from '@shared/errors/AppError';

import { InMemoryUserRepository } from '../repositories/InMemoryUserRepository';

let usersRepository: InMemoryUserRepository;
let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;
describe('Authenticate User', () => {
    beforeAll(async () => {
        usersRepository = new InMemoryUserRepository();
        authenticateUserService = new AuthenticateUserService(usersRepository);
        createUserService = new CreateUserService(usersRepository);
        await createUserService.execute({
            email: 'email@email.com',
            password: 'thePassword',
            name: 'Name Tester',
        });
        process.env.SECRET = 'yoursecrethjere';
    });

    it('Should be able to authenticate User', async () => {
        const response = await authenticateUserService.execute({
            email: 'email@email.com',
            password: 'thePassword',
        });
        expect(response).toHaveProperty('token');
    });

    it('Should not be able to authenticate User if not send email', async () => {
        try {
            await authenticateUserService.execute({
                email: undefined,
                password: 'thePassword',
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'Email required');
        }
    });

    it('Should not be able to authenticate User if not send password', async () => {
        try {
            await authenticateUserService.execute({
                email: 'email@email.com',
                password: undefined,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'Password required');
        }
    });

    it('Should not be able to authenticate User if send a short password', async () => {
        try {
            await authenticateUserService.execute({
                email: 'email@email.com',
                password: '1234567',
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'Passowrd must be at more than 8 characters',
            );
        }
    });

    it('Should not be able to authenticate User if send wrong mail', async () => {
        try {
            await authenticateUserService.execute({
                email: 'wrong@wrong.com',
                password: '123456789',
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'Email or Password incorrect',
            );
        }
    });

    it('Should not be able to authenticate User if send wrong password', async () => {
        try {
            await authenticateUserService.execute({
                email: 'email@email.com',
                password: '123456789',
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'Email or Password incorrect',
            );
        }
    });
});
