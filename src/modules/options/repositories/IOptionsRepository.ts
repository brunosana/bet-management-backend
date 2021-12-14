import { IOption } from '@modules/options/models/Option';

interface IOptionsRepository {
    all(): Promise<Array<IOption>>;
    create(name: string): Promise<IOption>;
    findByName(name: string): Promise<IOption>;
}

export { IOptionsRepository };
