import { CreateOptionService } from '@modules/options/useCases/createOption/CreateOptionService';
import { ListOptionService } from '@modules/options/useCases/listOption/ListOptionService';

import { InMemoryOptionRepository } from '../repositories/InMemoryOptionRepository';

let optionsRepository: InMemoryOptionRepository;
let listOptionService: ListOptionService;
let createOptionService: CreateOptionService;
describe('List Option', () => {
    beforeAll(async () => {
        optionsRepository = new InMemoryOptionRepository();
        listOptionService = new ListOptionService(optionsRepository);
        createOptionService = new CreateOptionService(optionsRepository);
        await createOptionService.execute('Option1');
        await createOptionService.execute('Option2');
        await createOptionService.execute('Option3');
        await createOptionService.execute('Option4');
        await createOptionService.execute('Option5');
        await createOptionService.execute('Option6');
        await createOptionService.execute('Option7');
    });

    it('Should be able to list Option', async () => {
        const response = await listOptionService.execute();
        expect(response).toHaveLength(7);
    });
});
