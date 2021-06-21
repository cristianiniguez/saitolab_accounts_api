import { ErrorRequestHandler } from 'express';
import boom from '@hapi/boom';

import config from '../../config';

const { dev } = config;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withErrorStack = (error: any, stack: any) => {
  return dev ? { error, stack } : { error };
};

export const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  next(err);
};

export const wrapErrors: ErrorRequestHandler = (err, req, res, next) => {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandlers: ErrorRequestHandler = (err, req, res, next) => {
  const {
    output: { statusCode, payload },
  } = err;
  res.status(statusCode).json(withErrorStack(payload, err.stack));
};
