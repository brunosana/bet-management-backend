import { Request, Response } from 'express';

import { GetUserService } from './GetUserService';

class GetUserController {
    constructor(private getUserService: GetUserService) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const user = await this.getUserService.execute(id);
        return response.json(user);
    }
}

export { GetUserController };
