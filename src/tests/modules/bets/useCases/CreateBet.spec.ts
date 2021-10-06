import { CreateBetService } from '@modules/bets/useCases/createBet/CreateBetService';
import { IOption } from '@modules/options/models/Option';
import { CreateOptionService } from '@modules/options/useCases/createOption/CreateOptionService';
import { IUser } from '@modules/users/models/User';
import { CreateUserService } from '@modules/users/useCases/createUser/CreateUserService';

import { AppError } from '@shared/errors/AppError';
import { generateUuid } from '@shared/utils/generateUuid';

import { InMemoryOptionRepository } from '../../options/repositories/InMemoryOptionRepository';
import { InMemoryUserRepository } from '../../users/repositories/InMemoryUserRepository';
import { InMemoryBetsRepository } from '../repositories/InMemoryBetRepository';

let betsRepository: InMemoryBetsRepository;
let usersRepository: InMemoryUserRepository;
let optionsRepository: InMemoryOptionRepository;
let createBetService: CreateBetService;
let createUserService: CreateUserService;
let createOptionService: CreateOptionService;
let user: IUser;
let option: IOption;
describe('Create Bet', () => {
    beforeAll(async () => {
        betsRepository = new InMemoryBetsRepository();
        usersRepository = new InMemoryUserRepository();
        optionsRepository = new InMemoryOptionRepository();

        createOptionService = new CreateOptionService(optionsRepository);
        createUserService = new CreateUserService(usersRepository);
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
    });

    it('Should be able to Create a Bet', async () => {
        const response = await createBetService.execute({
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

        expect(response).toHaveProperty('id');
    });

    it('Should not be able to Create a Bet without be logged', async () => {
        try {
            await createBetService.execute({
                bets: [
                    {
                        team: 'Team 1',
                        option: option.id,
                        odds: 1.5,
                    },
                ],
                bet_value: 50,
                userId: undefined,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'You must be logged to create a bet',
            );
        }
    });

    it('Should not be able to Create a Bet without send bets', async () => {
        try {
            await createBetService.execute({
                bets: undefined,
                bet_value: 50,
                userId: user.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'You need at least one bet for register',
            );
        }
    });

    it('Should not be able to Create a Bet without send bets like a empty array', async () => {
        try {
            await createBetService.execute({
                // eslint-disable-next-line
                bets: [] as any,
                bet_value: 50,
                userId: user.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'You need at least one bet for register',
            );
        }
    });

    it('Should not be able to Create a Bet without send bet value', async () => {
        try {
            await createBetService.execute({
                bets: [
                    {
                        team: 'Team 1',
                        option: option.id,
                        odds: 1.5,
                    },
                ],
                bet_value: undefined,
                userId: user.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'Bet value required');
        }
    });

    it('Should not be able to Create a Bet sending a bet with a invalid value', async () => {
        try {
            await createBetService.execute({
                bets: [
                    {
                        team: 'Team 1',
                        option: option.id,
                        odds: 1.5,
                    },
                ],
                bet_value: -1,
                userId: user.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'Invalid Bet value');
        }
    });

    it('Should not be able to Create a Bet if user not found', async () => {
        try {
            await createBetService.execute({
                bets: [
                    {
                        team: 'Team 1',
                        option: option.id,
                        odds: 1.5,
                    },
                ],
                bet_value: 20,
                userId: generateUuid(),
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'User not found');
        }
    });

    it('Should not be able to Create a Bet if option not found', async () => {
        try {
            await createBetService.execute({
                bets: [
                    {
                        team: 'Team 1',
                        option: generateUuid(),
                        odds: 1.5,
                    },
                ],
                bet_value: 20,
                userId: user.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'Bet option referent "Team 1 | Team 1" not found',
            );
        }
    });

    it('Should not be able to Create a Bet if not send odds', async () => {
        try {
            await createBetService.execute({
                bets: [
                    {
                        team: 'Team 1',
                        option: option.id,
                        odds: undefined,
                    },
                ],
                bet_value: 20,
                userId: user.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'All bets needs a Odds property',
            );
        }
    });

    it('Should not be able to Create a Bet if odds value is invalid', async () => {
        try {
            await createBetService.execute({
                bets: [
                    {
                        team: 'Team 1',
                        option: option.id,
                        odds: -1,
                    },
                ],
                bet_value: 20,
                userId: user.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'All Odds needs to be greather than 1',
            );
        }
    });

    it('Should not be able to Create a Bet if not send Team', async () => {
        try {
            await createBetService.execute({
                bets: [
                    {
                        team: undefined,
                        option: option.id,
                        odds: 1.4,
                    },
                ],
                bet_value: 20,
                userId: user.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'All bets needs a Team');
        }
    });
});
