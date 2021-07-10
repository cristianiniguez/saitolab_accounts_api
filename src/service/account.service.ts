import { Document } from 'mongoose';

import AccountModel from '../models/account.model';
import { Account } from '../types';

class AccountService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getAccounts(): Promise<(Account & Document<any, any, Account>)[]> {
    const accounts = await AccountModel.find().exec();
    return accounts;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getAccount(id: string): Promise<(Account & Document<any, any, Account>) | null> {
    const account = await AccountModel.findById(id).exec();
    return account;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async createAccount(data: Account): Promise<Account & Document<any, any, Account>> {
    const account = new AccountModel(data);
    await account.save();
    return account;
  }

  public async updateAccount(
    id: string,
    data: Partial<Account>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<(Account & Document<any, any, Account>) | null> {
    const account = await AccountModel.findByIdAndUpdate(id, { $set: data }, { new: true }).exec();
    return account;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async deleteAccount(id: string): Promise<(Account & Document<any, any, Account>) | null> {
    const account = await AccountModel.findByIdAndDelete(id).exec();
    return account;
  }
}

export default AccountService;
