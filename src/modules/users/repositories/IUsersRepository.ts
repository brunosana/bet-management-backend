import { IUser } from '../models/User';
import { ICreateGoogleUser } from './irequests/ICreateGoogleUser';
import { ICreateUser } from './irequests/ICreateUser';

interface IUsersRepository {
    findById(id: string): Promise<IUser>;
    findByEmail(email: string): Promise<IUser>;
    all(): Promise<Array<IUser>>;
    create(user: ICreateUser): Promise<IUser>;
    createGoogleUser(user: ICreateGoogleUser): Promise<IUser>;
    save(user: IUser): Promise<IUser>;
}

export { IUsersRepository };
