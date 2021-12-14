import { Request, Response } from 'express';

import { AuthenticateWithGoogleService } from './authenticateWithGoogleService';

class AuthenticateWithGoogleController {
    constructor(
        private authenticateWithGoogleService: AuthenticateWithGoogleService,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id, email, name } = request.body;

        const { user, token } =
            await this.authenticateWithGoogleService.execute({
                id,
                email,
                name,
            });

        return response.json({ user, token });
    }
}

export { AuthenticateWithGoogleController };
