import { IUser } from '@modules/users/models/User';
import { CreateUserService } from '@modules/users/useCases/createUser/CreateUserService';
import { UpdateUserService } from '@modules/users/useCases/updateUser/UpdateUserService';

import { AppError } from '@shared/errors/AppError';

import { InMemoryUserRepository } from '../repositories/InMemoryUserRepository';

let usersRepository: InMemoryUserRepository;
let updateUserService: UpdateUserService;
let createUserService: CreateUserService;
let userToUpdate: IUser;
describe('Update User', () => {
    beforeAll(async () => {
        usersRepository = new InMemoryUserRepository();
        createUserService = new CreateUserService(usersRepository);
        userToUpdate = await createUserService.execute({
            email: 'teste@teste.com',
            name: 'Name Tester',
            password: 'weHaveAPassword',
        });
    });

    beforeEach(async () => {
        updateUserService = new UpdateUserService(usersRepository);
        createUserService = new CreateUserService(usersRepository);
    });

    it('Should be able to Update a User name', async () => {
        const newUser = {
            id: userToUpdate.id,
            email: undefined,
            name: 'Tester Name',
            password: undefined,
        };
        const response = await updateUserService.execute({
            userId: userToUpdate.id,
            newUser,
        });
        expect(response).toHaveProperty('name', newUser.name);
        expect(response.password).toBeUndefined();
    });

    it('Should be able to Update a User email', async () => {
        const newUser = {
            id: userToUpdate.id,
            email: 'newEmail@newEmail.com',
            name: undefined,
            password: undefined,
        };
        const response = await updateUserService.execute({
            userId: userToUpdate.id,
            newUser,
        });
        expect(response).toHaveProperty('email', newUser.email);
    });

    it('Should be able to Update a User password', async () => {
        const newUser = {
            id: userToUpdate.id,
            email: undefined,
            name: undefined,
            password: 'TheNewPassword',
        };
        await updateUserService.execute({
            userId: userToUpdate.id,
            newUser,
            password: userToUpdate.password,
        });
        try {
            await updateUserService.execute({
                userId: userToUpdate.id,
                newUser,
                password: userToUpdate.password,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', "Password doesn't match");
        }
    });

    it('Should not be able to update User if not logged', async () => {
        try {
            await updateUserService.execute({
                userId: undefined,
                newUser: undefined,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'You must be logged to update a User',
            );
        }
    });

    it('Should not be able to update User without send newUser', async () => {
        try {
            await updateUserService.execute({
                userId: userToUpdate.id,
                newUser: undefined,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'User required to update');
        }
    });

    it('Should not be able to update User if email exists', async () => {
        await createUserService.execute({
            name: 'Temporary name',
            email: 'usedEmail@usedEmail.com',
            password: 'temporaryPassword',
        });
        try {
            const newUser = {
                id: userToUpdate.id,
                email: 'usedEmail@usedEmail.com',
                name: undefined,
                password: undefined,
            };
            await updateUserService.execute({
                userId: userToUpdate.id,
                newUser,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'Email already exists');
        }
    });

    it('Should not be able to Update a User if password have less than 8 characters', async () => {
        const newUser = {
            id: userToUpdate.id,
            email: undefined,
            name: undefined,
            password: '1234567',
        };

        try {
            await updateUserService.execute({
                userId: userToUpdate.id,
                newUser,
                password: 'TheNewPassword',
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'Password must be at least 8 characters',
            );
        }
    });
});
