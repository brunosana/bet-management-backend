import { Request, Response } from 'express';

import { AuthenticateUserService } from './AuthenticateUserService';

class AuthenticateUserController {
    constructor(private authenticateUserService: AuthenticateUserService) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        const { user, token } = await this.authenticateUserService.execute({
            email,
            password,
        });
        return response.json({ user, token });
    }
}

export { AuthenticateUserController };
