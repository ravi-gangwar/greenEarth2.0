import mongoose, { Schema } from 'mongoose';
import { TUser } from '@/types/TUser';
// Schema
const schema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  avatar: { type: String, required: false },
  address: { type: Object, required: false },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
});

const User = mongoose.models.User || mongoose.model<TUser>('User', schema);

export default User;
