interface IUser {
    id: string;
    name: string;
    email: string;
    password?: string;
    balance: number;
    gain: number;
    bets: number;
}

export { IUser };
