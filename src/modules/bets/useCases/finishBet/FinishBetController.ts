import { Request, Response } from 'express';

import { FinishBetService } from './FinishBetService';

class FinishBetController {
    constructor(private finishBetService: FinishBetService) {}
    async handle(request: Request, response: Response): Promise<Response> {
        const betId = request.params.id;
        const userId = request.user.id;
        const { bets } = request.body;
        const bet = await this.finishBetService.execute({
            userId,
            betId,
            bets,
        });
        return response.json(bet);
    }
}

export { FinishBetController };
