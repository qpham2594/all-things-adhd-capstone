import mongoose from 'mongoose';
const { Schema } = mongoose;

const monthlyListSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
});

export default mongoose.models.MonthlyList || mongoose.model('MonthlyList', monthlyListSchema);

