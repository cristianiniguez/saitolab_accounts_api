import boom from '@hapi/boom';
import { Handler } from 'express';

const notFoundHandler: Handler = (req, res) => {
  const {
    output: { statusCode, payload },
  } = boom.notFound();
  res.status(statusCode).json(payload);
};

export default notFoundHandler;
