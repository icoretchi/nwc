import { ConfigType, registerAs } from '@nestjs/config';

export const mongooseConfig = registerAs('mongoose', () => ({
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: process.env.DATABASE_PORT || 27017,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  uri: process.env.DATABASE_URL,
}));

export type MongooseConfig = ConfigType<typeof mongooseConfig>;
