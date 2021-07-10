import { Schema, model } from 'mongoose';

import { Account } from '../types';
import '../lib/mongo';

const accountSchema = new Schema<Account>({
  name: { type: String, required: true },
});

const AccountModel = model<Account>('Account', accountSchema);

export default AccountModel;
