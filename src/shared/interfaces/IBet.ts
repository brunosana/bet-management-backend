import { IOption } from "./IOption";

export interface IBet {
    bets: {
        team: string;
        odds: number;
        option: IOption;
    }
    bet_value: number;
}