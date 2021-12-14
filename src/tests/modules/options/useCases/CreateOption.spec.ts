import { CreateOptionService } from '@modules/options/useCases/createOption/CreateOptionService';

import { AppError } from '@shared/errors/AppError';

import { InMemoryOptionRepository } from '../repositories/InMemoryOptionRepository';

let optionsRepository: InMemoryOptionRepository;
let createOptionService: CreateOptionService;
describe('Create Option', () => {
    beforeEach(() => {
        optionsRepository = new InMemoryOptionRepository();
        createOptionService = new CreateOptionService(optionsRepository);
    });

    it('Should be able to create a Option', async () => {
        const response = await createOptionService.execute('New Option');
        expect(response).toHaveProperty('id');
    });

    it('Should not be able to create a Option with same name', async () => {
        try {
            await createOptionService.execute('New Option');
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty(
                'message',
                'Option already registered on database',
            );
        }
    });

    it('Should not be able to create a Option without send name', async () => {
        try {
            await createOptionService.execute(undefined);
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty('message', 'Name required');
        }
    });
});
