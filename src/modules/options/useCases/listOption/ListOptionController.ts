import { Request, Response } from 'express';

import { ListOptionService } from './ListOptionService';

class ListOptionController {
    constructor(private listOptionService: ListOptionService) {}
    async handle(request: Request, response: Response): Promise<Response> {
        const options = await this.listOptionService.execute();
        return response.json(options);
    }
}

export { ListOptionController };
