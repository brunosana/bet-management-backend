import { IBet } from '@modules/bets/models/Bet';
import { CreateBetService } from '@modules/bets/useCases/createBet/CreateBetService';
import { FinishBetService } from '@modules/bets/useCases/finishBet/FinishBetService';
import { IOption } from '@modules/options/models/Option';
import { CreateOptionService } from '@modules/options/useCases/createOption/CreateOptionService';
import { IUser } from '@modules/users/models/User';
import { CreateUserService } from '@modules/users/useCases/createUser/CreateUserService';
import { GetUserService } from '@modules/users/useCases/getUser/GetUserService';

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
let finishBetService: FinishBetService;
let getUserService: GetUserService;
let user: IUser;
let option: IOption;
let bet: IBet;

describe('Finish Bet', () => {
    beforeAll(async () => {
        betsRepository = new InMemoryBetsRepository();
        usersRepository = new InMemoryUserRepository();
        optionsRepository = new InMemoryOptionRepository();

        createOptionService = new CreateOptionService(optionsRepository);
        createUserService = new CreateUserService(usersRepository);
        getUserService = new GetUserService(usersRepository);
        finishBetService = new FinishBetService(
            betsRepository,
            usersRepository,
        );
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

    beforeEach(async () => {
        bet = await createBetService.execute({
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
    });

    it('Should be able to Finish a Bet gain', async () => {
        const response = await finishBetService.execute({
            userId: user.id,
            betId: bet.id,
            bets: [
                {
                    id: bet.bets[0].id,
                    team: 'Team 1',
                    option: option.id,
                    odds: 1.5,
                    gain: true,
                },
            ],
        });

        const savedUser = await getUserService.execute(user.id);
        expect(response).toHaveProperty('finished', true);
        expect(response).toHaveProperty('status', true);

        expect(savedUser).toHaveProperty('bets', user.bets + 1);
        expect(savedUser).toHaveProperty(
            'gain',
            user.gain + bet.bet_value * bet.bets[0].odds,
        );
        expect(savedUser).toHaveProperty(
            'balance',
            user.balance + bet.bet_value,
        );
        user = savedUser;
    });

    it('Should be able to Finish a Bet not gain', async () => {
        const response = await finishBetService.execute({
            userId: user.id,
            betId: bet.id,
            bets: [
                {
                    id: bet.bets[0].id,
                    team: 'Team 1',
                    option: option.id,
                    odds: 1.5,
                    gain: false,
                },
            ],
        });

        const savedUser = await getUserService.execute(user.id);

        expect(response).toHaveProperty('finished', true);
        expect(response).toHaveProperty('status', false);

        expect(savedUser).toHaveProperty('bets', user.bets + 1);
        expect(savedUser).toHaveProperty('gain', user.gain);
        expect(savedUser).toHaveProperty(
            'balance',
            user.balance + bet.bet_value,
        );
    });

    it('Should not be able finish Bet if not logged', async () => {
        try {
            await finishBetService.execute({
                userId: undefined,
                betId: bet.id,
                bets: [
                    {
                        id: bet.bets[0].id,
                        team: 'Team 1',
                        option: option.id,
                        odds: 1.5,
                        gain: false,
                    },
                ],
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'You must be logged to create a bet',
            );
        }
    });

    it('Should not be able finish Bet if not send betId', async () => {
        try {
            await finishBetService.execute({
                userId: user.id,
                betId: undefined,
                bets: [
                    {
                        id: bet.bets[0].id,
                        team: 'Team 1',
                        option: option.id,
                        odds: 1.5,
                        gain: false,
                    },
                ],
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'Bet id required');
        }
    });

    it('Should not be able finish Bet if not send bets', async () => {
        try {
            await finishBetService.execute({
                userId: user.id,
                betId: bet.id,
                bets: undefined,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'Bets required');
        }
    });

    it('Should not be able finish Bet if send empty bets array', async () => {
        try {
            await finishBetService.execute({
                userId: user.id,
                betId: bet.id,
                // eslint-disable-next-line
                bets: [] as any,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'You must to be send some bets',
            );
        }
    });

    it('Should not be able finish Bet if user not found', async () => {
        try {
            await finishBetService.execute({
                userId: generateUuid(),
                betId: bet.id,
                bets: [
                    {
                        id: bet.bets[0].id,
                        team: 'Team 1',
                        option: option.id,
                        odds: 1.5,
                        gain: false,
                    },
                ],
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'User not found');
        }
    });

    it('Should not be able finish Bet if bet not found', async () => {
        try {
            await finishBetService.execute({
                userId: user.id,
                betId: generateUuid(),
                bets: [
                    {
                        id: bet.bets[0].id,
                        team: 'Team 1',
                        option: option.id,
                        odds: 1.5,
                        gain: false,
                    },
                ],
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'Bet not found');
        }
    });

    it('Should not be able finish Bet if send with different bets size', async () => {
        try {
            await finishBetService.execute({
                userId: user.id,
                betId: bet.id,
                bets: [
                    {
                        id: bet.bets[0].id,
                        team: 'Team 1',
                        option: option.id,
                        odds: 1.5,
                        gain: false,
                    },
                    {
                        id: bet.bets[0].id,
                        team: 'Team 1',
                        option: option.id,
                        odds: 1.5,
                        gain: false,
                    },
                    // eslint-disable-next-line
                ] as any,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                "The bets stored on database does'nt match with the bets received",
            );
        }
    });

    it('Should not be able finish Bet if send with different user id', async () => {
        try {
            const wrongUser = await createUserService.execute({
                name: 'wrong',
                email: 'wrong@wrong',
                password: '123456789',
            });
            await finishBetService.execute({
                userId: wrongUser.id,
                betId: bet.id,
                bets: [
                    {
                        id: bet.bets[0].id,
                        team: 'Team 1',
                        option: option.id,
                        odds: 1.5,
                        gain: false,
                    },
                ],
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'You have no permission to finish this bet',
            );
        }
    });

    it('Should not be able finish Bet if bet already finished', async () => {
        await finishBetService.execute({
            userId: user.id,
            betId: bet.id,
            bets: [
                {
                    id: bet.bets[0].id,
                    team: 'Team 1',
                    option: option.id,
                    odds: 1.5,
                    gain: false,
                },
            ],
        });
        try {
            await finishBetService.execute({
                userId: user.id,
                betId: bet.id,
                bets: [
                    {
                        id: bet.bets[0].id,
                        team: 'Team 1',
                        option: option.id,
                        odds: 1.5,
                        gain: false,
                    },
                ],
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'This Bet already finished',
            );
        }
    });

    it("Should not be able finish Bet if bets order doesn't match", async () => {
        try {
            await finishBetService.execute({
                userId: user.id,
                betId: bet.id,
                bets: [
                    {
                        id: generateUuid(),
                        team: 'Team 1',
                        option: option.id,
                        odds: 1.5,
                        gain: false,
                    },
                ],
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', "Bets order doesn't match");
        }
    });

    it('Should not be able finish Bet if not send gain', async () => {
        try {
            await finishBetService.execute({
                userId: user.id,
                betId: bet.id,
                bets: [
                    {
                        id: bet.bets[0].id,
                        team: 'Team 1',
                        option: option.id,
                        odds: 1.5,
                        gain: undefined,
                    },
                ],
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'Gain property required on each Bet',
            );
        }
    });
});
