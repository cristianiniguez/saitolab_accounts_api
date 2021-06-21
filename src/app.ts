import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import accountRoutes from './routes/account.routes';

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/account', accountRoutes);

export default app;
