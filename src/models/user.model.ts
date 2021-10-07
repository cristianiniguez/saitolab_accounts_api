import { Schema, model } from 'mongoose';

import { User } from '../types';

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = model<User>('user', userSchema);

export default UserModel;
