import { IUser } from '../models/User';
import { ICreateUser } from './irequests/ICreateUser';

interface IUsersRepository {
    findById(id: string): Promise<IUser>;
    findByEmail(email: string): Promise<IUser>;
    all(): Promise<Array<IUser>>;
    create(user: ICreateUser): Promise<IUser>;
    save(user: IUser): Promise<IUser>;
}

export { IUsersRepository };
