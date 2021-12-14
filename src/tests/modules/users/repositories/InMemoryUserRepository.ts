import { IUser } from '@modules/users/models/User';
import { ICreateGoogleUser } from '@modules/users/repositories/irequests/ICreateGoogleUser';
import { ICreateUser } from '@modules/users/repositories/irequests/ICreateUser';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { generateUuid } from '@shared/utils/generateUuid';

interface IUserInMemory extends IUser {
    password: string;
}

class InMemoryUserRepository implements IUsersRepository {
    users: IUserInMemory[] = [];

    async findById(id: string): Promise<IUser> {
        const user = this.users.find(u => u.id === id);
        if (user) {
            return {
                id: user.id,
                balance: user.balance,
                bets: user.bets,
                email: user.email,
                password: user.password,
                gain: user.gain,
                name: user.name,
            } as IUser;
        }
        return undefined;
    }
    async findByEmail(email: string): Promise<IUser> {
        const user = this.users.find(u => u.email === email);
        if (user) {
            return {
                id: user.id,
                balance: user.balance,
                bets: user.bets,
                email: user.email,
                password: user.password,
                gain: user.gain,
                name: user.name,
            } as IUser;
        }
        return undefined;
    }
    async all(): Promise<IUser[]> {
        return this.users;
    }
    async create({ email, name, password }: ICreateUser): Promise<IUser> {
        const index = this.users.push({
            email,
            name,
            password,
            balance: 0,
            bets: 0,
            gain: 0,
            id: generateUuid(),
        });
        const createdUser = this.users[index - 1];
        const user = {
            id: createdUser.id,
            balance: createdUser.balance,
            email: createdUser.email,
            password: createdUser.password,
            bets: createdUser.bets,
            gain: createdUser.gain,
            name: createdUser.name,
        } as IUser;
        return user;
    }

    async createGoogleUser({ name, email, googleId }: ICreateGoogleUser): Promise<IUser>{
        const index = this.users.push({
            email,
            name,
            googleAuth: true,
            googleId,
            password: undefined,
            balance: 0,
            bets: 0,
            gain: 0,
            id: generateUuid(),
        });
        const createdUser = this.users[index - 1];
        const user = {
            id: createdUser.id,
            balance: createdUser.balance,
            email: createdUser.email,
            password: createdUser.password,
            googleAuth: true,
            googleId,
            bets: createdUser.bets,
            gain: createdUser.gain,
            name: createdUser.name,
        } as IUser;
        return user;
    }

    async save(user: IUser): Promise<IUser> {
        const userId = this.users.findIndex(u => u.id === user.id);
        this.users[userId] = user as IUserInMemory;
        return this.users[userId];
    }
}

export { InMemoryUserRepository };
