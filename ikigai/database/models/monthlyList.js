import mongoose from 'mongoose';
const { Schema } = mongoose;

const monthlyListSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now, // default to the current date
  },
  task: {
    type: String,
    required: true,
  }
});

export default mongoose.models.MonthlyList || mongoose.model('MonthlyList', monthlyListSchema);

