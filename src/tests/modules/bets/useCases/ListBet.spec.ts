import { CreateBetService } from '@modules/bets/useCases/createBet/CreateBetService';
import { ListBetService } from '@modules/bets/useCases/listBet/ListBetService';
import { IOption } from '@modules/options/models/Option';
import { CreateOptionService } from '@modules/options/useCases/createOption/CreateOptionService';
import { IUser } from '@modules/users/models/User';
import { CreateUserService } from '@modules/users/useCases/createUser/CreateUserService';

import { AppError } from '@shared/errors/AppError';

import { InMemoryOptionRepository } from '../../options/repositories/InMemoryOptionRepository';
import { InMemoryUserRepository } from '../../users/repositories/InMemoryUserRepository';
import { InMemoryBetsRepository } from '../repositories/InMemoryBetRepository';

let betsRepository: InMemoryBetsRepository;
let usersRepository: InMemoryUserRepository;
let optionsRepository: InMemoryOptionRepository;
let createBetService: CreateBetService;
let createUserService: CreateUserService;
let createOptionService: CreateOptionService;
let listBetService: ListBetService;
let user: IUser;
let option: IOption;

describe('List Bets', () => {
    beforeAll(async () => {
        betsRepository = new InMemoryBetsRepository();
        usersRepository = new InMemoryUserRepository();
        optionsRepository = new InMemoryOptionRepository();

        createOptionService = new CreateOptionService(optionsRepository);
        createUserService = new CreateUserService(usersRepository);
        listBetService = new ListBetService(betsRepository);
        createBetService = new CreateBetService(
            betsRepository,
            usersRepository,
            optionsRepository,
        );

        user = await createUserService.execute({
            email: 'email@email.com',
            name: 'Tester',
            password: '12345678',
        });

        option = await createOptionService.execute('+1,5');

        await createBetService.execute({
            bets: [
                {
                    team: 'Team 1',
                    option: option.id,
                    odds: 1.5,
                },
            ],
            bet_value: 50,
            userId: user.id,
        });
        await createBetService.execute({
            bets: [
                {
                    team: 'Team 2',
                    option: option.id,
                    odds: 1.3,
                },
            ],
            bet_value: 30,
            userId: user.id,
        });
        await createBetService.execute({
            bets: [
                {
                    team: 'Team 3',
                    option: option.id,
                    odds: 1.33,
                },
            ],
            bet_value: 15,
            userId: user.id,
        });
    });

    it('Should be able to List Bets', async () => {
        const response = await listBetService.execute({
            id: user.id,
            max: undefined,
            opened: undefined,
        });

        expect(response).toHaveLength(3);
    });

    it('Should not be able to List Bets if not logged', async () => {
        try {
            await listBetService.execute(undefined);
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'You must be logged to create a bet',
            );
        }
    });

    it("Should not be able to List Bets that wasn't not created by requested user", async () => {
        const fakeUser = await createUserService.execute({
            email: 'fake@fake.com',
            name: 'Faker',
            password: '123456789',
        });
        await createBetService.execute({
            bets: [
                {
                    team: 'Team Faker',
                    option: option.id,
                    odds: 1.33,
                },
            ],
            bet_value: 15,
            userId: fakeUser.id,
        });
        const response = await listBetService.execute({
            id: user.id,
            max: undefined,
            opened: undefined,
        });

        expect(response).toHaveLength(3);
    });
});
