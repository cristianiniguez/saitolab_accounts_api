import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const env = dotenv.config();
dotenvExpand(env);

const config = {
  port: process.env.PORT || 3000,
  dev: process.env.NODE_ENV === 'development',
  db: {
    uri: process.env.DB_URI,
    name: process.env.DB_NAME,
  },
  authJwtSecret: process.env.AUTH_JWT_SECRET as string,
};

export default config;
