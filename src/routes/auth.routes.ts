import { Router } from 'express';

import UserService from '../service/user.service';
import validationHandler from '../utils/middlewares/validationHandler';
import { createUserSchema } from '../utils/schemas/user.schema';

const router = Router();
const userService = new UserService();

router.post('/sign-in', (req, res) => {
  res.send('Sign in successfull');
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
