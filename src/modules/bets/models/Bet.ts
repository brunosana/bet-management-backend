import { Schema, model, Types, Document } from 'mongoose';

interface IBet extends Document {
    bets: [
        {
            team: string;
            option: string;
            odds: number;
        },
    ];
    bet_value: number;
    finished: boolean;
    user: string;
}

const BetSchema = new Schema(
    {
        bets: [
            {
                team: {
                    type: String,
                    required: true,
                },
                option: {
                    type: Types.ObjectId,
                    ref: 'options',
                    required: true,
                },
                odds: {
                    type: Number,
                    required: true,
                    min: 0.01,
                },
            },
        ],
        bet_value: {
            type: Number,
            required: true,
        },
        finished: {
            type: Boolean,
            default: false,
        },
        user: {
            type: Types.ObjectId,
            ref: 'users',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Bet = model<IBet>('bets', BetSchema);

export { Bet, IBet };
