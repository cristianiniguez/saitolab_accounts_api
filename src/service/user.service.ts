import { Document } from 'mongoose';
import boom from '@hapi/boom';
import bcrypt from 'bcrypt';

import UserModel from '../models/user.model';
import { User } from '../types';

class UserService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async createUser(data: User): Promise<Document<any, any, User> & User> {
    const { name, email, password } = data;

    // checking if there is an user with the same email
    const foundUser = await UserModel.findOne({ email }).exec();
    if (foundUser) throw boom.badRequest('user with this email alredy exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    const createdUserId = await newUser.save();
    return createdUserId;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getUserByEmail(email: string): Promise<(Document<any, any, User> & User) | null> {
    return await UserModel.findOne({ email }).exec();
  }
}

export default UserService;
