import { registerAs } from '@nestjs/config';

export default registerAs('sequelize', () => ({
  type: process.env.ORM_CONNECTION || 'postgres',
  host: process.env.ORM_HOST || '127.0.0.1',
  port: Number(process.env.ORM_PORT),
  username: process.env.ORM_USER || 'postgres',
  password: process.env.ORM_PASSWORD || 'postgres',
  database: process.env.ORM_DATABASE || 'postgres',
  logging: process.env.ORM_LOGGING === 'true',
  force: true,
  timezone: '+02:00',
}));
