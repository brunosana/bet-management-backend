import { Bet, IBet } from '@modules/bets/models/Bet';

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
// PRECISA ENVIAR OS BETS COM O RESULTADO DAS APOSTAS

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

        const bet = await Bet.findOne({ id: betId });
        if (!bet) {
            throw new AppError('Bet not found', 404);
        }

        if (bets.length !== bet.bets.length) {
            throw new AppError(
                "The bets stored on database does'nt match with the bets received",
            );
        }

        if (bet.user.toString() !== userId) {
            throw new AppError(
                'You have no permission to finish this bet',
                401,
            );
        }

        if (bet.finished) {
            throw new AppError('This Bet already finished');
        }

        bet.status = true;
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
        }

        bet.finished = true;

        await bet.save();

        return bet;
    }
}

export { FinishBetService };
