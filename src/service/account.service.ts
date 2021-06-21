import MongoLib from '../lib/mongo';
import { Account } from '../types';

class AccountService {
  private collection = 'account';
  private mongoDB = new MongoLib<Account>();

  public async getAccounts(): Promise<Account[]> {
    const accounts = await this.mongoDB.getAll(this.collection);
    return accounts;
  }

  public async getAccount(id: string): Promise<Account> {
    const account = await this.mongoDB.get(this.collection, id);
    return account;
  }

  public async createAccount(data: Account): Promise<Account> {
    const account = await this.mongoDB.create(this.collection, data);
    return account;
  }

  public async updateAccount(id: string, data: Partial<Account>): Promise<string> {
    const account = await this.mongoDB.update(this.collection, id, data);
    return account;
  }

  public async deleteAccount(id: string): Promise<string> {
    const account = await this.mongoDB.delete(this.collection, id);
    return account;
  }
}

export default AccountService;
