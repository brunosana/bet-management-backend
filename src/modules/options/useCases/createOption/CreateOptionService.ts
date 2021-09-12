import { Option, IOption } from '@modules/options/models/Option';

import { AppError } from '@shared/errors/AppError';

class CreateOptionService {
    public async execute(name: IOption['name']): Promise<IOption> {
        if (!name) {
            throw new AppError('Name required');
        }

        const OptionExists = await Option.findOne({ name });
        if (OptionExists) {
            throw new AppError('Option already registered on database');
        }
        const option = await Option.create({ name });
        return option;
    }
}

export { CreateOptionService };
