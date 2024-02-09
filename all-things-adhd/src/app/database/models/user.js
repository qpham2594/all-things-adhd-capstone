import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  monthlyList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'monthlyList',
    },
  ],
});

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password') || this.isNew) {
      const hashingPassword = await bcrypt.hash(this.password, 12);
      this.password = hashingPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.User || mongoose.model('User', userSchema);