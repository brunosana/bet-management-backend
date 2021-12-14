export interface IBet {
    id: string;
    bets: [
        {
            id?: string;
            team: string;
            option: string;
            odds: number;
            gain: boolean;
        },
    ];
    bet_value: number;
    finished: boolean;
    user: string;
    status: boolean;
}
