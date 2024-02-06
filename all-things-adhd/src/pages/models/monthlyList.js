import {Schema, model, mongoose} from 'mongoose';

const monthlyListSchema = new mongoose.Schema (
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
module.exports = monthlyList  