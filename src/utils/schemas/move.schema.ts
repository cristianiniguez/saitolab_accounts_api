import Joi from 'joi';

import { accountIdSchema } from './account.schema';

export const moveIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

export const moveCreateSchema = Joi.object({
  accountId: accountIdSchema.required(),

  title: Joi.string().required(),
  date: Joi.date().required(),
  value: Joi.number().positive().required(),
  type: Joi.string().valid('IN', 'OUT').required(),
});

export const moveUpdateSchema = Joi.object({
  title: Joi.string(),
  date: Joi.date(),
  value: Joi.number().positive(),
  type: Joi.string().valid('IN', 'OUT'),
});
