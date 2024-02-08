import {Schema, mongoose} from 'mongoose';

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

export default mongoose.models.monthlyList || mongoose.model("monthlyList", monthlyListSchema);