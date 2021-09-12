import { Request, Response } from 'express';

import { CreateBetService } from './CreateBetService';

class CreateBetController {
    constructor(private createBetService: CreateBetService) {}
    async handle(request: Request, response: Response): Promise<Response> {
        const { bet_value, bets } = request.body;
        const { id } = request.user;

        const bet = await this.createBetService.execute({
            bet_value,
            bets,
            userId: id,
        });

        return response.json(bet);
    }
}

export { CreateBetController };
