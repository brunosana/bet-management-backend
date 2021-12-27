import { IBet } from '@modules/bets/models/Bet';
import { IBetsRepository } from '@modules/bets/repositories/IBetsRepository';

import { AppError } from '@shared/errors/AppError';

interface IListBets {
    id: string;
    opened: string;
    max: string;
}
class ListBetService {
    constructor(private betsRepository: IBetsRepository) {}

    public async execute({ id, max, opened }: IListBets): Promise<Array<IBet>> {
        if (!id) {
            throw new AppError('You must be logged to create a bet', 401);
        }
        let bets = [] as Array<IBet>;

        if (opened) {
            bets = await this.betsRepository.findByOpened(id);
            return bets;
        }

        if (max && parseInt(max, 10) > 0) {
            bets = await this.betsRepository.findByUserLimit(
                id,
                parseInt(max, 10),
            );
            return bets;
        }

        bets = await this.betsRepository.findByUser(id);

        return bets;
    }
}

export { ListBetService };
