import { IOption } from '@modules/options/models/Option';
import { IOptionsRepository } from '@modules/options/repositories/IOptionsRepository';

import { AppError } from '@shared/errors/AppError';

class CreateOptionService {
    constructor(private optionsRepository: IOptionsRepository) {}

    public async execute(name: IOption['name']): Promise<IOption> {
        if (!name) {
            throw new AppError('Name required');
        }

        const OptionExists = await this.optionsRepository.findByName(name);
        if (OptionExists) {
            throw new AppError('Option already registered on database');
        }
        const option = await this.optionsRepository.create(name);
        return option;
    }
}

export { CreateOptionService };
