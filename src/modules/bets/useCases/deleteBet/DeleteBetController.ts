import { Request, Response } from 'express';

import { DeleteBetService } from './DeleteBetService';

class DeleteBetController {
    constructor(private deleteBetService: DeleteBetService) {}
    async handle(request: Request, response: Response): Promise<Response> {
        const userId = request.user.id;
        const betId = request.params.id;
        await this.deleteBetService.execute({ betId, userId });
        return response.status(201).send();
    }
}

export { DeleteBetController };
