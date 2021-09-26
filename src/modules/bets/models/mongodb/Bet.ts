import { Schema, model, Types, Document } from 'mongoose';

import { IBet } from '../Bet';

interface IBetMongo extends IBet, Document {
    id: string;
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
                    default: false,
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

const Bet = model<IBetMongo>('bets', BetSchema);

export { Bet, IBetMongo };
