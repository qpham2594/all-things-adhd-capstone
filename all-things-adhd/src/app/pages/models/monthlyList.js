import {Schema, model} from 'mongoose';

const monthlyListSchema = new Schema (
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        date: {
            type: Date,
            required: true
        },

        task: {
            type: String,
            required: true
        }

    }
)

const monthlyList = model('monthlyList', monthlyListSchema)

export default monthlyList