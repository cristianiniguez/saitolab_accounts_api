import Joi from 'joi';

export const accountIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

export const accountCreateSchema = Joi.object({
  title: Joi.string().required(),
  date: Joi.date().required(),
  value: Joi.number().positive().required(),
  type: Joi.string().valid('IN', 'OUT').required(),
});

export const accountUpdateSchema = Joi.object({
  title: Joi.string(),
  date: Joi.date(),
  value: Joi.number().positive(),
  type: Joi.string().valid('IN', 'OUT'),
});
