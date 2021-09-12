import { Schema, model, Document } from 'mongoose';

interface IOption extends Document {
    name: string;
}

const OptionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

const Option = model<IOption>('options', OptionSchema);

export { Option, IOption };
