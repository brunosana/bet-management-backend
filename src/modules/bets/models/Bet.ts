import { Schema, model, Types, Document } from 'mongoose';

interface IBet extends Document {
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
                gain: {
                    type: Boolean,
                },
            },
        ],
        bet_value: {
            type: Number,
            required: true,
        },
        status: {
            type: Boolean,
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
