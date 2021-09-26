import { Option } from '@modules/options/models/mongodb/Option';
import { IOption } from '@modules/options/models/Option';
import { IOptionsRepository } from '@modules/options/repositories/IOptionsRepository';

class MongodbOptionsRepository implements IOptionsRepository {
    private static INSTANCE: MongodbOptionsRepository;

    // eslint-disable-next-line
    private constructor() {}

    public static getInstance(): MongodbOptionsRepository {
        if (!MongodbOptionsRepository.INSTANCE) {
            MongodbOptionsRepository.INSTANCE = new MongodbOptionsRepository();
        }
        return MongodbOptionsRepository.INSTANCE;
    }
    async all(): Promise<IOption[]> {
        const options = await Option.find();
        return options;
    }
    async create(name: string): Promise<IOption> {
        const option = await Option.create({ name });
        return option;
    }
    async findByName(name: string): Promise<IOption> {
        const option = await Option.findOne({ name });
        return option;
    }
}

export { MongodbOptionsRepository };
