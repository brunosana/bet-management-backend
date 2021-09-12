import { hash } from 'bcrypt';
import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    balance: number;
    gain: number;
    bets: number;
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
            required: true,
            minlength: 8,
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

UserSchema.pre('save', async function encrypt(next) {
    this.password = await hash(this.password, 10);
    next();
});

const User = model<IUser>('users', UserSchema);

export { User, IUser };
