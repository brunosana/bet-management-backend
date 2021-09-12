import { Request, Response } from 'express';

import { ListBetService } from './ListBetService';

class ListBetController {
    constructor(private listBetService: ListBetService) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const bets = await this.listBetService.execute(id);
        return response.json(bets);
    }
}

export { ListBetController };
