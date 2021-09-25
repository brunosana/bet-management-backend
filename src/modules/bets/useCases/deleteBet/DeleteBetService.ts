import { IBetsRepository } from '@modules/bets/repositories/IBetsRepository';
import { User } from '@modules/users/models/User';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
    betId: string;
    userId: string;
}

class DeleteBetService {
    constructor(private betsRepository: IBetsRepository) {}

    public async execute({ betId, userId }: IRequest): Promise<void> {
        if (!userId) {
            throw new AppError(
                'You must be logget to be able to delete a Bet',
                401,
            );
        }

        if (!betId) {
            throw new AppError('Bet Id required');
        }

        const user = await User.findOne({ _id: userId });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const bet = await this.betsRepository.findById(betId);

        if (!bet) {
            throw new AppError('Bet not found', 404);
        }

        if (bet.user.toString() !== user.id) {
            throw new AppError(
                'You can delete only bets that you created',
                401,
            );
        }

        if (!bet.finished) {
            await this.betsRepository.delete(bet.id);
            return null;
        }

        user.balance -= bet.bet_value;

        let finalOdds = 1;
        if (bet.status) {
            for (let i = 0; i < bet.bets.length; i++) {
                finalOdds *= bet.bets[i].odds;
            }
            user.gain -= bet.bet_value * finalOdds;
        }

        user.bets -= 1;
        await user.save();
        await this.betsRepository.delete(bet.id);
        return null;
    }
}

export { DeleteBetService };
