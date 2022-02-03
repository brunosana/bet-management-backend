import { IBet } from '@modules/bets/models/Bet';
import { Bet } from '@modules/bets/models/mongodb/Bet';

import { IBetsRepository } from '../IBetsRepository';
import { ICreateBet } from '../irequests/ICreateBet';
import { IListBetFilter } from '../irequests/IListBetFilter';

class MongodbBetsRepository implements IBetsRepository {
    private static INSTANCE: MongodbBetsRepository;

    // eslint-disable-next-line
    private constructor() {}

    public static getInstance(): MongodbBetsRepository {
        if (!MongodbBetsRepository.INSTANCE) {
            MongodbBetsRepository.INSTANCE = new MongodbBetsRepository();
        }
        return MongodbBetsRepository.INSTANCE;
    }

    async findByUser(id: string): Promise<Array<IBet>> {
        const bets = await Bet.find({ user: id });
        return bets;
    }

    async save(bet: IBet): Promise<IBet> {
        const betToSave = await Bet.findOne({ _id: bet.id });
        betToSave.bet_value = bet.bet_value;
        betToSave.bets = bet.bets;
        betToSave.status = bet.status;
        betToSave.finished = bet.finished;
        const response = await betToSave.save();
        return response;
    }

    async findById(id: string): Promise<IBet> {
        const bet = await Bet.findOne({ _id: id });
        return bet;
    }

    async all(): Promise<IBet[]> {
        const bets = await Bet.find();
        return bets;
    }

    async create({ user, bet_value, bets }: ICreateBet): Promise<IBet> {
        const bet = await Bet.create({
            bets,
            bet_value,
            user,
        });
        return bet;
    }

    async delete(id: string): Promise<void> {
        await Bet.findOneAndRemove({ _id: id });
    }

    async findByOpened({ id, opened }: IListBetFilter): Promise<IBet[]> {
        const bets = await Bet.find({
            user: id,
            finished: opened,
        });
        return bets;
    }

    async findByUserLimit(id: string, max: number): Promise<IBet[]> {
        const bets = await Bet.find({ user: id })
            .sort({ createdAt: -1 })
            .limit(max);
        return bets;
    }
}

export { MongodbBetsRepository };
