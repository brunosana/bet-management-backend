import { User } from '@modules/users/models/mongodb/User';
import { IUser } from '@modules/users/models/User';

import { ICreateUser } from '../irequests/ICreateUser';
import { IUsersRepository } from '../IUsersRepository';

class MongodbUsersRepository implements IUsersRepository {
    private static INSTANCE: MongodbUsersRepository;

    // eslint-disable-next-line
    private constructor() {}

    async findById(id: string): Promise<IUser> {
        const user = await User.findOne({ _id: id });
        return user;
    }

    async findByEmail(email: string): Promise<IUser> {
        const user = await User.findOne({ email });
        return user;
    }

    async all(): Promise<IUser[]> {
        const users = await User.find();
        return users;
    }

    async create({ name, email, password }: ICreateUser): Promise<IUser> {
        const user = await User.create({
            name,
            email,
            password,
        });
        return user;
    }

    async save({
        id,
        balance,
        bets,
        email,
        gain,
        name,
        password,
    }: IUser): Promise<IUser> {
        const userToSave = await User.findOne({ _id: id });

        userToSave.balance = balance;
        userToSave.bets = bets;
        userToSave.email = email;
        userToSave.gain = gain;
        userToSave.name = name;
        userToSave.password = password;

        await userToSave.save();

        return userToSave;
    }

    public static getIstance(): MongodbUsersRepository {
        if (!MongodbUsersRepository.INSTANCE) {
            MongodbUsersRepository.INSTANCE = new MongodbUsersRepository();
        }
        return MongodbUsersRepository.INSTANCE;
    }
}

export { MongodbUsersRepository };
