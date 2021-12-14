interface ICreateBet {
    bets: [
        {
            team: string;
            option: string;
            odds: number;
        },
    ];
    bet_value: number;
    user: string;
}

export { ICreateBet };
