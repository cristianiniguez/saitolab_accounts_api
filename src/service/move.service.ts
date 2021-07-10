import { Document } from 'mongoose';

import MoveModel from '../models/move.model';
import { Move } from '../types';

class MoveService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getMoves(): Promise<(Move & Document<any, any, Move>)[]> {
    const moves = await MoveModel.find().exec();
    return moves;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getMove(id: string): Promise<(Move & Document<any, any, Move>) | null> {
    const move = await MoveModel.findById(id).exec();
    return move;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async createMove(data: Move): Promise<Move & Document<any, any, Move>> {
    const move = new MoveModel(data);
    await move.save();
    return move;
  }

  public async updateMove(
    id: string,
    data: Partial<Move>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<(Move & Document<any, any, Move>) | null> {
    const move = await MoveModel.findByIdAndUpdate(id, { $set: data }, { new: true }).exec();
    return move;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async deleteMove(id: string): Promise<(Move & Document<any, any, Move>) | null> {
    const move = await MoveModel.findByIdAndDelete(id).exec();
    return move;
  }
}

export default MoveService;
