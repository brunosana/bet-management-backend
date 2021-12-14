import { IOption } from '@modules/options/models/Option';
import { IOptionsRepository } from '@modules/options/repositories/IOptionsRepository';

import { generateUuid } from '@shared/utils/generateUuid';

class InMemoryOptionRepository implements IOptionsRepository {
    options: IOption[] = [];

    async all(): Promise<IOption[]> {
        return this.options;
    }
    async create(name: string): Promise<IOption> {
        const index = this.options.push({
            id: generateUuid(),
            name,
        });
        return {
            id: this.options[index - 1].id,
            name: this.options[index - 1].name,
        } as IOption;
    }
    async findByName(name: string): Promise<IOption> {
        const option = this.options.find(op => op.name === name);
        if (option) {
            return {
                id: option.id,
                name: option.name,
            } as IOption;
        }
        return undefined;
    }
}

export { InMemoryOptionRepository };
