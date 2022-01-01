import { IBet } from '@modules/bets/models/Bet';
import { ICreateBet } from '@modules/bets/repositories/irequests/ICreateBet';

import { IListBetFilter } from './irequests/IListBetFilter';

interface IBetsRepository {
    all(): Promise<Array<IBet>>;
    create(bet: ICreateBet): Promise<IBet>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<IBet>;
    findByUser(id: string): Promise<Array<IBet>>;
    findByUserLimit(id: string, max: number): Promise<Array<IBet>>;
    findByOpened(data: IListBetFilter): Promise<Array<IBet>>;
    save(bet: IBet): Promise<IBet>;
}

export { IBetsRepository };
