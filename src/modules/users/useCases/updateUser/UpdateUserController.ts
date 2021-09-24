import { Request, Response } from 'express';

import { UpdateUserService } from './UpdateUserService';

class UpdateUserController {
    constructor(private updateUserService: UpdateUserService) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const userId = request.user.id;
        const { user, password } = request.body;

        const updatedUser = await this.updateUserService.execute({
            userId,
            password,
            newUser: user,
        });
        return response.json(updatedUser);
    }
}

export { UpdateUserController };
