import { IBet } from '@modules/bets/models/Bet';
import { IBetsRepository } from '@modules/bets/repositories/IBetsRepository';
import { Option } from '@modules/options/models/Option';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
    betId: string;
    userId: string;
    newBet: {
        bets: IBet['bets'];
        bet_value: IBet['bet_value'];
    };
}

class UpdateBetService {
    constructor(
        private betsRepository: IBetsRepository,
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ betId, userId, newBet }: IRequest): Promise<IBet> {
        if (!userId) {
            throw new AppError('You must be logged to update a bet', 401);
        }
        if (!betId) {
            throw new AppError('betId required');
        }
        if (!newBet) {
            throw new AppError('Bet required to update');
        }
        if (!newBet.bets) {
            throw new AppError('At least one bet required to update');
        }
        if (newBet.bets.length <= 0) {
            throw new AppError('At least one bet required to update');
        }
        if (!newBet.bet_value) {
            throw new AppError('Bet value required');
        }
        if (newBet.bet_value <= 0) {
            throw new AppError('Invalid Bet value');
        }
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const bet = await this.betsRepository.findById(betId);

        if (!bet) {
            throw new AppError('Bet not found', 404);
        }

        if (bet.finished) {
            throw new AppError(
                "This bet already finished, you can't change a finished bet",
            );
        }

        const options = await Option.find();

        for (let i = 0; i < bet.bets.length; i++) {
            const optionIndex = options.findIndex(
                op => op.id === newBet.bets[i].option,
            );
            if (optionIndex < 0) {
                throw new AppError(
                    `Bet option referent "${newBet.bets[i].team} | ${newBet.bets[i].team}" not found`,
                    404,
                );
            }
            if (!newBet.bets[i].odds) {
                throw new AppError('All bets needs a Odds property');
            }
            if (newBet.bets[i].odds <= 1) {
                throw new AppError('All Odds needs to be greather than 1');
            }
            if (!newBet.bets[i].team) {
                throw new AppError('All bets needs a Team');
            }
        }

        bet.bet_value = newBet.bet_value;
        bet.bets = newBet.bets;

        await this.betsRepository.save(bet);

        return bet;
    }
}

export { UpdateBetService };
