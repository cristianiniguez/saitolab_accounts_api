import MongoLib from '../lib/mongo';
import { Move } from '../types';

class MoveService {
  private collection = 'move';
  private mongoDB = new MongoLib<Move>();

  public async getMoves(): Promise<Move[]> {
    const moves = await this.mongoDB.getAll(this.collection);
    return moves;
  }

  public async getMove(id: string): Promise<Move> {
    const move = await this.mongoDB.get(this.collection, id);
    return move;
  }

  public async createMove(data: Move): Promise<Move> {
    const move = await this.mongoDB.create(this.collection, data);
    return move;
  }

  public async updateMove(id: string, data: Partial<Move>): Promise<string> {
    const move = await this.mongoDB.update(this.collection, id, data);
    return move;
  }

  public async deleteMove(id: string): Promise<string> {
    const move = await this.mongoDB.delete(this.collection, id);
    return move;
  }
}

export default MoveService;
