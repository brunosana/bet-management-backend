import { Option, IOption } from '@modules/options/models/Option';

class ListOptionService {
    public async execute(): Promise<Array<IOption>> {
        const options = await Option.find();
        return options;
    }
}

export { ListOptionService };
