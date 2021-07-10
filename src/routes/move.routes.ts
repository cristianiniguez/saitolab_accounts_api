import { Router } from 'express';
import Joi from 'joi';

import MoveService from '../service/move.service';
import { moveIdSchema, moveCreateSchema, moveUpdateSchema } from '../utils/schemas/move.schema';
import validationHandler from '../utils/middlewares/validationHandler';

const router = Router();
const moveService = new MoveService();

router.get('/', async (req, res, next) => {
  try {
    const moves = await moveService.getMoves();
    res.status(200).json({ message: 'moves listed', moves });
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validationHandler(Joi.object({ id: moveIdSchema }), 'params'),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const move = await moveService.getMove(id);
      res.status(200).json({ message: 'move listed', move });
    } catch (error) {
      next(error);
    }
  },
);

router.post('/', validationHandler(moveCreateSchema), async (req, res, next) => {
  const data = req.body;

  try {
    const move = await moveService.createMove(data);
    res.status(201).json({ message: 'move created', move });
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:id',
  validationHandler(Joi.object({ id: moveIdSchema }), 'params'),
  validationHandler(moveUpdateSchema),
  async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;

    try {
      const move = await moveService.updateMove(id, data);
      res.status(200).json({ message: 'move updated', move });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validationHandler(Joi.object({ id: moveIdSchema }), 'params'),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const move = await moveService.deleteMove(id);
      res.status(200).json({ message: 'move deleted', move });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
