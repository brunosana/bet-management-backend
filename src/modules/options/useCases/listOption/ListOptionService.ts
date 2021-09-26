import { IOption } from '@modules/options/models/Option';
import { IOptionsRepository } from '@modules/options/repositories/IOptionsRepository';

class ListOptionService {
    constructor(private optionsRepository: IOptionsRepository) {}

    public async execute(): Promise<Array<IOption>> {
        const options = await this.optionsRepository.all();
        return options;
    }
}

export { ListOptionService };
