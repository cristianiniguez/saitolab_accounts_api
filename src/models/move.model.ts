import { Schema, model } from 'mongoose';

import { Move } from '../types';

const moveSchema = new Schema<Move>({
  title: { type: String, required: true },
  accountId: { type: Schema.Types.ObjectId },
  date: { type: Date, required: true },
  value: { type: Number, required: true },
  type: { type: String, required: true },
});

const MoveModel = model<Move>('Move', moveSchema);

export default MoveModel;
