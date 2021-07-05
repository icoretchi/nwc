import { registerAs } from '@nestjs/config';

export default registerAs('mongoose', () => ({
  host: process.env.MONGO_HOST || '127.0.0.1',
  port: process.env.MONGO_PORT || 27017,
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  database: process.env.MONGO_DATABASE,
  uri: process.env.MONGO_URI,
}));
