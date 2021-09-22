import { Bet, IBet } from '@modules/bets/models/Bet';
import { User } from '@modules/users/models/User';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
    userId: string;
    betId: string;
    bets: [
        {
            team: string;
            option: string;
            odds: number;
            gain: boolean;
            id: string;
        },
    ];
}

class FinishBetService {
    public async execute({ userId, betId, bets }: IRequest): Promise<IBet> {
        if (!userId) {
            throw new AppError('You must be logged to create a bet', 401);
        }
        if (!betId) {
            throw new AppError('Bet id required');
        }
        if (!bets) {
            throw new AppError('Bets required');
        }
        if (bets.length <= 0) {
            throw new AppError('You must to be send some bets');
        }

        const user = await User.findOne({ _id: userId });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const bet = await Bet.findOne({ _id: betId });
        if (!bet) {
            throw new AppError('Bet not found', 404);
        }

        if (bets.length !== bet.bets.length) {
            throw new AppError(
                "The bets stored on database does'nt match with the bets received",
            );
        }

        console.log(betId);
        if (bet.user.toString() !== userId) {
            throw new AppError(
                'You have no permission to finish this bet',
                401,
            );
        }

        console.log(bet);
        console.log(bet.finished);
        if (bet.finished) {
            throw new AppError('This Bet already finished');
        }

        bet.status = true;
        let finalOdds = 1;
        for (let i = 0; i < bet.bets.length; i++) {
            if (bets[i].id !== bet.bets[i].id) {
                throw new AppError("Bets order doesn't match");
            }
            if (bets[i].gain === undefined) {
                throw new AppError('Gain property required on each Bet');
            }
            if (!bets[i].gain) {
                bet.status = false;
                break;
            }
            finalOdds *= bets[i].odds;
        }

        bet.finished = true;

        bet.bets = bets;

        if (bet.status) {
            user.gain += bet.bet_value * finalOdds;
        }

        user.bets += 1;
        user.balance += bet.bet_value;

        await bet.save();

        await user.save();

        return bet;
    }
}

export { FinishBetService };
