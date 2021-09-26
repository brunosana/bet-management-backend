import { Schema, model, Document } from 'mongoose';

import { IOption } from '../Option';

interface IOptionMongo extends IOption, Document {
    id: string;
}

const OptionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

const Option = model<IOptionMongo>('options', OptionSchema);

export { Option, IOptionMongo };
