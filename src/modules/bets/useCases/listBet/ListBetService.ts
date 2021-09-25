import { IBet } from '@modules/bets/models/Bet';
import { IBetsRepository } from '@modules/bets/repositories/IBetsRepository';

import { AppError } from '@shared/errors/AppError';

class ListBetService {
    constructor(private betsRepository: IBetsRepository) {}

    public async execute(userId: IBet['user']): Promise<Array<IBet>> {
        if (!userId) {
            throw new AppError('You must be logged to create a bet', 401);
        }
        const bets = await this.betsRepository.findByUser(userId);

        return bets;
    }
}

export { ListBetService };
