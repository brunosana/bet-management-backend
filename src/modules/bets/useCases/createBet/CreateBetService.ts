import { IBet } from '@modules/bets/models/Bet';
import { IBetsRepository } from '@modules/bets/repositories/IBetsRepository';
import { Option } from '@modules/options/models/Option';
import { User } from '@modules/users/models/User';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
    bets: [
        {
            team: string;
            option: string;
            odds: number;
        },
    ];
    bet_value: number;
    userId: string;
}

class CreateBetService {
    constructor(private betsRepository: IBetsRepository) {}

    public async execute({ bet_value, bets, userId }: IRequest): Promise<IBet> {
        if (!userId) {
            throw new AppError('You must be logged to create a bet', 401);
        }
        if (!bets) {
            throw new AppError('You need at least one bet for register');
        }
        if (bets.length <= 0) {
            throw new AppError('You need at least one bet for register');
        }
        if (!bet_value) {
            throw new AppError('Bet value required');
        }
        if (bet_value <= 0) {
            throw new AppError('Invalid Bet value');
        }

        const user = await User.findOne({ _id: userId });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const options = await Option.find();

        bets.forEach(bet => {
            const optionIndex = options.findIndex(op => op.id === bet.option);
            if (optionIndex < 0) {
                throw new AppError(
                    `Bet option referent "${bet.team} | ${bet.team}" not found`,
                    404,
                );
            }
            if (!bet.odds) {
                throw new AppError('All bets needs a Odds property');
            }
            if (bet.odds <= 1) {
                throw new AppError('All Odds needs to be greather than 1');
            }
            if (!bet.team) {
                throw new AppError('All bets needs a Team');
            }
        });

        const bet = await this.betsRepository.create({
            bets,
            bet_value,
            user: userId,
        });

        return bet;
    }
}

export { CreateBetService };
