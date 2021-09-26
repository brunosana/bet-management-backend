import { Bet, IBet } from '@modules/bets/models/Bet';

import { AppError } from '@shared/errors/AppError';

class ListBetService {
    public async execute(userId: IBet['user']): Promise<Array<IBet>> {
        if (!userId) {
            throw new AppError('You must be logged to create a bet', 401);
        }
        const bets = await Bet.find({
            user: userId,
        });
        return bets;
    }
}

export { ListBetService };
