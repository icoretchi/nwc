import { registerAs } from '@nestjs/config';

export default registerAs('sequelize', () => ({
  type: process.env.DATABASE_TYPE || 'postgres',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_DATABASE || 'postgres',
  logging: process.env.DATABASE_LOGGING === 'true',
  force: true,
  timezone: '+02:00',
}));
