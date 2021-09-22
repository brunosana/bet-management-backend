import { Request, Response } from 'express';

import { UpdateBetService } from './UpdateBetService';

class UpdateBetController {
    constructor(private updateBetService: UpdateBetService) {}
    async handle(request: Request, response: Response): Promise<Response> {
        const betId = request.params.id;
        const userId = request.user.id;
        const { bets, bet_value } = request.body;
        const bet = await this.updateBetService.execute({
            betId,
            userId,
            newBet: {
                bet_value,
                bets,
            },
        });

        return response.json(bet);
    }
}

export { UpdateBetController };
