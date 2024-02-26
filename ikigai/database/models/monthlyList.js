import { Schema, mongoose } from 'mongoose';

const monthlyListSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  task: {
    type: String,
    required: true,
  },
});

export default mongoose.models.monthlyList || mongoose.model('monthlyList', monthlyListSchema);
