import Joi from 'joi';

export const accountIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

export const accountCreateSchema = Joi.object({
  name: Joi.string().required(),
});

export const accountUpdateSchema = Joi.object({
  name: Joi.string(),
});
