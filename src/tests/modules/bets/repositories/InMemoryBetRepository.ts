import { IBet } from '@modules/bets/models/Bet';
import { IBetsRepository } from '@modules/bets/repositories/IBetsRepository';
import { ICreateBet } from '@modules/bets/repositories/irequests/ICreateBet';

import { generateUuid } from '@shared/utils/generateUuid';

class InMemoryBetsRepository implements IBetsRepository {
    bets: IBet[] = [];

    async all(): Promise<IBet[]> {
        return this.bets;
    }
    async create(bet: ICreateBet): Promise<IBet> {
        const newBets = [];
        for (let i = 0; i < bet.bets.length; i++) {
            const betToPush = {
                id: generateUuid(),
                team: bet.bets[i].team,
                gain: false,
                odds: bet.bets[i].odds,
                option: bet.bets[i].option,
            };
            newBets.push(betToPush);
        }
        const index = this.bets.push({
            id: generateUuid(),
            bet_value: bet.bet_value,
            bets: newBets as IBet['bets'],
            finished: false,
            status: false,
            user: bet.user,
        });
        const betCreated = this.bets[index - 1];

        return {
            id: betCreated.id,
            bet_value: betCreated.bet_value,
            bets: betCreated.bets,
            finished: betCreated.finished,
            status: betCreated.status,
            user: betCreated.user,
        } as IBet;
    }
    async delete(id: string): Promise<void> {
        const index = this.bets.findIndex(bet => bet.id === id);
        this.bets.splice(index, 1);
    }
    async findById(id: string): Promise<IBet> {
        const bet = this.bets.find(bet => bet.id === id);
        if (bet) {
            return {
                id: bet.id,
                bet_value: bet.bet_value,
                bets: bet.bets,
                finished: bet.finished,
                status: bet.status,
                user: bet.user,
            } as IBet;
        }
        return undefined;
    }
    async findByUser(id: string): Promise<IBet[]> {
        const bets: IBet[] = [];

        // eslint-disable-next-line
        this.bets.map(bet => {
            if (bet.user === id) {
                bets.push({
                    id: bet.id,
                    bet_value: bet.bet_value,
                    bets: bet.bets,
                    finished: bet.finished,
                    status: bet.status,
                    user: bet.user,
                });
            }
        });
        return bets;
    }
    async save(bet: IBet): Promise<IBet> {
        const index = this.bets.findIndex(b => b.id === bet.id);
        this.bets[index] = {
            id: bet.id,
            bets: bet.bets,
            bet_value: bet.bet_value,
            finished: bet.finished,
            status: bet.status,
            user: bet.user,
        };
        return {
            id: this.bets[index].id,
            bet_value: this.bets[index].bet_value,
            bets: this.bets[index].bets,
            finished: this.bets[index].finished,
            status: this.bets[index].status,
            user: this.bets[index].user,
        } as IBet;
    }

    async findByOpened(id: string): Promise<IBet[]> {
        const bets: IBet[] = [];

        // eslint-disable-next-line
        this.bets.map(bet => {
            if (bet.user === id && bet.finished) {
                bets.push({
                    id: bet.id,
                    bet_value: bet.bet_value,
                    bets: bet.bets,
                    finished: bet.finished,
                    status: bet.status,
                    user: bet.user,
                });
            }
        });
        return bets;
    }

    async findByUserLimit(id: string, max: number): Promise<IBet[]> {
        const bets: IBet[] = [];

        // eslint-disable-next-line
        this.bets.map(bet => {
            if (bet.user === id) {
                bets.push({
                    id: bet.id,
                    bet_value: bet.bet_value,
                    bets: bet.bets,
                    finished: bet.finished,
                    status: bet.status,
                    user: bet.user,
                });
            }
        });
        if (bets.length <= max) {
            return bets;
        }
        return bets.splice(max, bets.length - max);
    }
}

export { InMemoryBetsRepository };
