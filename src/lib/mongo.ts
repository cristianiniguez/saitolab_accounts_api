import mongoose from 'mongoose';
import config from '../config';

const MONGO_URI = config.db.uri as string;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
