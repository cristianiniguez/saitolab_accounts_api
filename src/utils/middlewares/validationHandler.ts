import { Handler, Request } from 'express';
import { Schema } from 'joi';
import boom from '@hapi/boom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validate = (data: any, schema: Schema) => {
  const { error } = schema.validate(data);
  return error;
};

const validationHandler = (schema: Schema, check: keyof Request = 'body'): Handler => {
  return function (req, res, next) {
    const error = validate(req[check], schema);
    error ? next(boom.badRequest(error.message)) : next();
  };
};

export default validationHandler;
