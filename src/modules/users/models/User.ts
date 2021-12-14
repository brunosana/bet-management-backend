interface IUser {
    id: string;
    name: string;
    email: string;
    googleAuth?: Boolean;
    googleId?: string;
    password?: string;
    balance: number;
    gain: number;
    bets: number;
}

export { IUser };
