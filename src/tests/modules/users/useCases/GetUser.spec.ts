import { GetUserService } from '@modules/users/useCases/getUser/GetUserService';

import { AppError } from '@shared/errors/AppError';

import { InMemoryUserRepository } from '../repositories/InMemoryUserRepository';

let getUserService: GetUserService;
let usersRepository: InMemoryUserRepository;
describe('Get User', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUserRepository();
        getUserService = new GetUserService(usersRepository);
    });

    it('Should be able to get User', async () => {
        const spyRepository = jest.spyOn(usersRepository, 'findById');

        spyRepository.mockReturnValue(
            Promise.resolve({
                id: '123',
                balance: 0,
                bets: 0,
                email: 'email@email.com',
                gain: 0,
                name: 'User',
                password: undefined,
            }),
        );

        const response = await getUserService.execute('123');

        expect(response).toHaveProperty('id', '123');

        spyRepository.mockRestore();
    });

    it('Should not be able to get User if send a different userId', async () => {
        let spyRepository;
        try {
            spyRepository = jest.spyOn(usersRepository, 'findById');

            spyRepository.mockReturnValue(Promise.resolve(undefined));

            await getUserService.execute('1234');
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'User not found');
        } finally {
            spyRepository.mockRestore();
        }
    });
    it('Should not be able to get User not logged', async () => {
        try {
            await getUserService.execute(undefined);
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'You must be logged to get a User',
            );
        }
    });
});
