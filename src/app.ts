import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import accountRoutes from './routes/account.routes';
import moveRoutes from './routes/move.routes';
import notFoundHandler from './utils/middlewares/notFoundHandler';
import { logErrors, wrapErrors, errorHandlers } from './utils/middlewares/errorHandlers';

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/account', accountRoutes);
app.use('/api/move', moveRoutes);

app.use(notFoundHandler);

app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandlers);

export default app;
