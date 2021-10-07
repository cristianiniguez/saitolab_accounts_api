import { Router } from 'express';
import passport from 'passport';
import boom from '@hapi/boom';
import jwt from 'jsonwebtoken';

import config from '../config';
import UserService from '../service/user.service';
import validationHandler from '../utils/middlewares/validationHandler';
import { createUserSchema } from '../utils/schemas/user.schema';

import '../utils/auth/strategies/basic';

const router = Router();
const userService = new UserService();

router.post('/sign-in', (req, res, next) => {
  passport.authenticate('basic', (error, user) => {
    try {
      if (error || !user) {
        next(boom.unauthorized);
      }

      const { _id: id, name, email } = user;
      const payload = { sub: id, name, email };
      const token = jwt.sign(payload, config.authJwtSecret, { expiresIn: 86400 });

      res.status(200).json({ token, user: { id, name, email } });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

router.post('/sign-up', validationHandler(createUserSchema), async (req, res, next) => {
  const user = req.body;
  try {
    const { _id, name, email } = await userService.createUser(user);
    res.status(201).json({
      data: { id: _id, name, email },
      message: 'user created',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
