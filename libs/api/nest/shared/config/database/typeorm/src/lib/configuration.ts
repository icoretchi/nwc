import { registerAs } from '@nestjs/config';
import { getMetadataArgsStorage } from 'typeorm';

const entitiesPath = process.env.TYPEORM_ENTITIES
  ? `${process.env.TYPEORM_ENTITIES}`
  : 'dist/**/*.entity.js';
const migrationPath = process.env.TYPEORM_MIGRATIONS
  ? `${process.env.TYPEORM_MIGRATIONS}`
  : 'dist/**/migrations/*.js';

export default registerAs('typeorm', () => ({
  type: process.env.TYPEORM_CONNECTION || 'postgres',
  host: process.env.TYPEORM_HOST || '127.0.0.1',
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  logging: process.env.TYPEORM_LOGGING === 'true',
  sincronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  port: Number.parseInt(process.env.TYPEORM_PORT, 10),
  entities: getMetadataArgsStorage().tables.map((t) => t.target) || [
    entitiesPath,
  ],
  migrations: [migrationPath],
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  seeds: ['src/**/migrations/seeds/*.seed.ts'],
  cli: {
    migrationsDir: 'src/**/migrations',
    entitiesDir: 'src/**/*.entity.ts',
  },
}));
