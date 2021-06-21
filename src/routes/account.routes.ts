import { Router } from 'express';

import AccountsService from '../service/account.service';
import {
  accountIdSchema,
  accountCreateSchema,
  accountUpdateSchema,
} from '../utils/schemas/account.schema';
import validationHandler from '../utils/middlewares/validationHandler';
import Joi from 'joi';

const router = Router();
const accountsService = new AccountsService();

router.get('/', async (req, res, next) => {
  try {
    const accounts = await accountsService.getAccounts();
    res.status(200).json({
      message: 'accounts listed',
      accounts,
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validationHandler(Joi.object({ id: accountIdSchema }), 'params'),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const account = await accountsService.getAccount(id);
      res.status(200).json({
        message: 'account listed',
        account,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.post('/', validationHandler(accountCreateSchema), async (req, res, next) => {
  const data = req.body;

  try {
    const account = await accountsService.createAccount(data);
    res.status(201).json({
      message: 'account created',
      account,
    });
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:id',
  validationHandler(Joi.object({ id: accountIdSchema }), 'params'),
  validationHandler(accountUpdateSchema),
  async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;

    try {
      const accountId = await accountsService.updateAccount(id, data);
      res.status(200).json({
        message: 'account updated',
        account: {
          id: accountId,
        },
      });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validationHandler(Joi.object({ id: accountIdSchema }), 'params'),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const accountId = await accountsService.deleteAccount(id);
      res.status(200).json({
        message: 'account deleted',
        account: {
          id: accountId,
        },
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
