import { Request, Response } from 'express';

import { ListBetService } from './ListBetService';

class ListBetController {
    constructor(private listBetService: ListBetService) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const { opened, max } = request.query as {
            opened: string;
            max: string;
        };
        const bets = await this.listBetService.execute({
            id,
            max,
            opened,
        });
        return response.json(bets);
    }
}

export { ListBetController };
