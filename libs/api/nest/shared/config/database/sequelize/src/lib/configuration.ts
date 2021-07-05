import { registerAs } from '@nestjs/config';

export default registerAs('sequelize', () => ({
  type: process.env.TYPEORM_CONNECTION || 'postgres',
  host: process.env.TYPEORM_HOST || '127.0.0.1',
  port: Number(process.env.TYPEORM_PORT) || 5432,
  username: process.env.TYPEORM_USER || 'postgres',
  password: process.env.TYPEORM_PASSWORD || 'postgres',
  database: process.env.TYPEORM_DATABASE || 'postgres',
  logging: process.env.TYPEORM_LOGGING === 'true',
  force: true,
  timezone: '+02:00',
}));
