import dotenvflow from 'dotenv-flow';

dotenvflow.config();

export default {
  ENV: process.env.ENV,
  UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
  PORT: process.env.PORT,
  SERVER_URL: process.env.SERVER_URL,
  DATABASE_URL: process.env.DATABASE_URL
};
