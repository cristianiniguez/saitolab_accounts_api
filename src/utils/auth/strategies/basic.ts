import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import boom from '@hapi/boom';
import bcrypt from 'bcrypt';

import UserService from '../../../service/user.service';

passport.use(
  new BasicStrategy(async (email, password, cb) => {
    const usersService = new UserService();

    try {
      const user = await usersService.getUserByEmail(email);

      if (!user) {
        return cb(boom.unauthorized());
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized());
      }

      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  }),
);
