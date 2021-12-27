import { IBet } from '@modules/bets/models/Bet';
import { ICreateBet } from '@modules/bets/repositories/irequests/ICreateBet';

interface IBetsRepository {
    all(): Promise<Array<IBet>>;
    create(bet: ICreateBet): Promise<IBet>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<IBet>;
    findByUser(id: string): Promise<Array<IBet>>;
    findByUserLimit(id: string, max: number): Promise<Array<IBet>>;
    findByOpened(id: string): Promise<Array<IBet>>;
    save(bet: IBet): Promise<IBet>;
}

export { IBetsRepository };
