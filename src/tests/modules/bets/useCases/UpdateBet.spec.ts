import { IBet } from '@modules/bets/models/Bet';
import { CreateBetService } from '@modules/bets/useCases/createBet/CreateBetService';
import { FinishBetService } from '@modules/bets/useCases/finishBet/FinishBetService';
import { UpdateBetService } from '@modules/bets/useCases/updateBet/UpdateBetService';
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
let updateBetService: UpdateBetService;
let finishBetService: FinishBetService;
let user: IUser;
let option: IOption;
let bet: IBet;

describe('Update Bet', () => {
    beforeAll(async () => {
        betsRepository = new InMemoryBetsRepository();
        usersRepository = new InMemoryUserRepository();
        optionsRepository = new InMemoryOptionRepository();

        createOptionService = new CreateOptionService(optionsRepository);
        createUserService = new CreateUserService(usersRepository);
        finishBetService = new FinishBetService(
            betsRepository,
            usersRepository,
        );
        createBetService = new CreateBetService(
            betsRepository,
            usersRepository,
            optionsRepository,
        );
        updateBetService = new UpdateBetService(
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

    it('Should be able to update a Bet', async () => {
        const response = await updateBetService.execute({
            betId: bet.id,
            newBet: {
                bets: [
                    {
                        id: bet.bets[0].id,
                        team: 'New Team',
                        option: option.id,
                        odds: 1.5,
                        gain: false,
                    },
                ],
                bet_value: 60,
            },
            userId: user.id,
        });
        expect(response).toHaveProperty('bets', [
            {
                id: bet.bets[0].id,
                team: 'New Team',
                option: option.id,
                odds: 1.5,
                gain: false,
            },
        ]);
        expect(response).toHaveProperty('bet_value', 60);
    });

    it('Should not be able to update a bet if not logged', async () => {
        try {
            await updateBetService.execute({
                betId: bet.id,
                newBet: {
                    bets: [
                        {
                            id: bet.bets[0].id,
                            team: 'New Team',
                            option: option.id,
                            odds: 1.5,
                            gain: false,
                        },
                    ],
                    bet_value: 60,
                },
                userId: undefined,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'You must be logged to update a bet',
            );
        }
    });

    it('Should not be able to update a bet if not send betId', async () => {
        try {
            await updateBetService.execute({
                betId: undefined,
                newBet: {
                    bets: [
                        {
                            id: bet.bets[0].id,
                            team: 'New Team',
                            option: option.id,
                            odds: 1.5,
                            gain: false,
                        },
                    ],
                    bet_value: 60,
                },
                userId: user.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'betId required');
        }
    });

    it('Should not be able to update a bet if not send new bet', async () => {
        try {
            await updateBetService.execute({
                betId: bet.id,
                newBet: undefined,
                userId: user.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'Bet required to update');
        }
    });

    it('Should not be able to update a bet if not send bets', async () => {
        try {
            await updateBetService.execute({
                betId: bet.id,
                newBet: {
                    bets: undefined,
                    bet_value: 60,
                },
                userId: user.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'At least one bet required to update',
            );
        }
    });

    it('Should not be able to update a bet if send a bets empty array', async () => {
        try {
            await updateBetService.execute({
                betId: bet.id,
                newBet: {
                    // eslint-disable-next-line
                    bets: [] as any,
                    bet_value: 60,
                },
                userId: user.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'At least one bet required to update',
            );
        }
    });

    it('Should not be able to update a bet if not send a bet_value', async () => {
        try {
            await updateBetService.execute({
                betId: bet.id,
                newBet: {
                    bets: [
                        {
                            id: bet.bets[0].id,
                            team: 'New Team',
                            option: option.id,
                            odds: 1.5,
                            gain: false,
                        },
                    ],
                    bet_value: undefined,
                },
                userId: user.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'Bet value required');
        }
    });

    it('Should not be able to update a bet if send a invalid bet_value', async () => {
        try {
            await updateBetService.execute({
                betId: bet.id,
                newBet: {
                    bets: [
                        {
                            id: bet.bets[0].id,
                            team: 'New Team',
                            option: option.id,
                            odds: 1.5,
                            gain: false,
                        },
                    ],
                    bet_value: -1,
                },
                userId: user.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'Invalid Bet value');
        }
    });

    it('Should not be able to update a bet if User not found', async () => {
        try {
            await updateBetService.execute({
                betId: bet.id,
                newBet: {
                    bets: [
                        {
                            id: bet.bets[0].id,
                            team: 'New Team',
                            option: option.id,
                            odds: 1.5,
                            gain: false,
                        },
                    ],
                    bet_value: 50,
                },
                userId: generateUuid(),
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'User not found');
        }
    });

    it('Should not be able to update a bet if Bet not found', async () => {
        try {
            await updateBetService.execute({
                betId: generateUuid(),
                newBet: {
                    bets: [
                        {
                            id: bet.bets[0].id,
                            team: 'New Team',
                            option: option.id,
                            odds: 1.5,
                            gain: false,
                        },
                    ],
                    bet_value: 50,
                },
                userId: user.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'Bet not found');
        }
    });

    it('Should not be able to update a bet if send a wrong optionId', async () => {
        try {
            await updateBetService.execute({
                betId: bet.id,
                newBet: {
                    bets: [
                        {
                            id: bet.bets[0].id,
                            team: 'New Team',
                            option: undefined,
                            odds: 1.5,
                            gain: false,
                        },
                    ],
                    bet_value: 50,
                },
                userId: user.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'Bet option referent "New Team | New Team" not found',
            );
        }
    });

    it('Should not be able to update a bet if not send Odds', async () => {
        try {
            await updateBetService.execute({
                betId: bet.id,
                newBet: {
                    bets: [
                        {
                            id: bet.bets[0].id,
                            team: 'New Team',
                            option: option.id,
                            odds: undefined,
                            gain: false,
                        },
                    ],
                    bet_value: 50,
                },
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

    it('Should not be able to update a bet if send invalid odds value', async () => {
        try {
            await updateBetService.execute({
                betId: bet.id,
                newBet: {
                    bets: [
                        {
                            id: bet.bets[0].id,
                            team: 'New Team',
                            option: option.id,
                            odds: -1,
                            gain: false,
                        },
                    ],
                    bet_value: 50,
                },
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

    it('Should not be able to update a bet if not send team', async () => {
        try {
            await updateBetService.execute({
                betId: bet.id,
                newBet: {
                    bets: [
                        {
                            id: bet.bets[0].id,
                            team: undefined,
                            option: option.id,
                            odds: 1.15,
                            gain: false,
                        },
                    ],
                    bet_value: 50,
                },
                userId: user.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'All bets needs a Team');
        }
    });

    it('Should not be able to update a bet if Bet finished', async () => {
        try {
            await finishBetService.execute({
                userId: user.id,
                betId: bet.id,
                bets: [
                    {
                        id: bet.bets[0].id,
                        team: 'New Team',
                        option: option.id,
                        odds: 1.5,
                        gain: true,
                    },
                ],
            });
            await updateBetService.execute({
                betId: bet.id,
                newBet: {
                    bets: [
                        {
                            id: bet.bets[0].id,
                            team: 'New Team',
                            option: option.id,
                            odds: 1.5,
                            gain: false,
                        },
                    ],
                    bet_value: 50,
                },
                userId: user.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                "This bet already finished, you can't change a finished bet",
            );
        }
    });
});
