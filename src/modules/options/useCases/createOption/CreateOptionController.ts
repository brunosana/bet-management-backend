import { Request, Response } from 'express';

import { CreateOptionService } from './CreateOptionService';

class CreateOptionController {
    constructor(private createOptionService: CreateOptionService) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name } = request.body;
        const Option = await this.createOptionService.execute(name);
        return response.json(Option);
    }
}

export { CreateOptionController };
