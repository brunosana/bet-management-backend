import { IUser } from '@modules/users/models/User';
import { Schema, model, Document } from 'mongoose';

interface IUserMongo extends IUser, Document {
    id: string;
}

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: false,
            minlength: 8,
        },
        googleAuth: {
            type: Boolean,
            default: false,
        },
        googleId: {
            type: String,
            required: false,
        },
        balance: {
            type: Number,
            default: 0,
        },
        gain: {
            type: Number,
            default: 0,
        },
        bets: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);

const User = model<IUser>('users', UserSchema);

export { User, IUserMongo };
