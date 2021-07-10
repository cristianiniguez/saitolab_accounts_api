import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  dev: process.env.NODE_ENV === 'development',
  db: {
    uri: process.env.DB_URI,
    name: process.env.DB_NAME,
  },
};

export default config;
