import { IBet } from '@modules/bets/models/Bet';
import { CreateBetService } from '@modules/bets/useCases/createBet/CreateBetService';
import { DeleteBetService } from '@modules/bets/useCases/deleteBet/DeleteBetService';
import { FinishBetService } from '@modules/bets/useCases/finishBet/FinishBetService';
import { ListBetService } from '@modules/bets/useCases/listBet/ListBetService';
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

let createBetService: CreateBetService;
let createUserService: CreateUserService;
let createOptionService: CreateOptionService;
let deleteBetService: DeleteBetService;
let listBetService: ListBetService;
let finishBetService: FinishBetService;
let getUserService: GetUserService;

let usersRepository: InMemoryUserRepository;
let betsRepository: InMemoryBetsRepository;
let optionsRepository: InMemoryOptionRepository;

let user: IUser;
let bet: IBet;
let option: IOption;
describe('Delete Bet', () => {
    beforeAll(async () => {
        usersRepository = new InMemoryUserRepository();
        betsRepository = new InMemoryBetsRepository();
        optionsRepository = new InMemoryOptionRepository();
        listBetService = new ListBetService(betsRepository);
        finishBetService = new FinishBetService(
            betsRepository,
            usersRepository,
        );
        createBetService = new CreateBetService(
            betsRepository,
            usersRepository,
            optionsRepository,
        );
        createUserService = new CreateUserService(usersRepository);
        createOptionService = new CreateOptionService(optionsRepository);
        deleteBetService = new DeleteBetService(
            betsRepository,
            usersRepository,
        );
        getUserService = new GetUserService(usersRepository);

        user = await createUserService.execute({
            email: 'email@email.com',
            name: 'Tester',
            password: '123456789',
        });
        option = await createOptionService.execute('+1,5');
    });

    beforeEach(async () => {
        betsRepository = new InMemoryBetsRepository();
        bet = await createBetService.execute({
            bet_value: 20,
            bets: [
                {
                    odds: 1.15,
                    team: 'Team 1',
                    option: option.id,
                },
            ],
            userId: user.id,
        });
    });

    it('Should be able to delete a bet', async () => {
        await deleteBetService.execute({
            betId: bet.id,
            userId: user.id,
        });
        const response = await listBetService.execute({
            id: user.id,
            max: undefined,
            opened: undefined,
        });

        expect(response).toHaveLength(0);
    });

    it('Should be able to delete a bet finished and restore user data', async () => {
        await finishBetService.execute({
            userId: user.id,
            betId: bet.id,
            bets: [
                {
                    id: bet.bets[0].id,
                    odds: 1.15,
                    team: 'Team 1',
                    option: option.id,
                    gain: true,
                },
            ],
        });

        await deleteBetService.execute({
            betId: bet.id,
            userId: user.id,
        });
        const newUser = await getUserService.execute(user.id);
        const response = await listBetService.execute({
            id: user.id,
            max: undefined,
            opened: undefined,
        });

        expect(newUser).toHaveProperty('balance', user.balance);
        expect(newUser).toHaveProperty('bets', user.bets);
        expect(newUser).toHaveProperty('gain', user.gain);
        expect(response).toHaveLength(0);
    });

    it('Should not be able to delete a bet if not logged', async () => {
        try {
            await deleteBetService.execute({
                betId: bet.id,
                userId: undefined,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'You must be logget to be able to delete a Bet',
            );
        }
    });

    it('Should not be able to delete a bet if not send betId', async () => {
        try {
            await deleteBetService.execute({
                betId: undefined,
                userId: user.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'Bet Id required');
        }
    });

    it('Should not be able to delete a bet if user not found', async () => {
        try {
            await deleteBetService.execute({
                betId: bet.id,
                userId: generateUuid(),
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'User not found');
        }
    });

    it('Should not be able to delete a bet if bet not found', async () => {
        try {
            await deleteBetService.execute({
                betId: generateUuid(),
                userId: user.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'Bet not found');
        }
    });

    it('Should not be able to delete a bet if user not created', async () => {
        try {
            const newUser = await createUserService.execute({
                email: 'wrong@wrong.com',
                name: 'Wrong Tester',
                password: '123456789',
            });
            await deleteBetService.execute({
                betId: bet.id,
                userId: newUser.id,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'You can delete only bets that you created',
            );
        }
    });
});
