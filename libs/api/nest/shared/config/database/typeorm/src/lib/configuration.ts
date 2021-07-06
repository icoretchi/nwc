import { registerAs } from '@nestjs/config';
import { getMetadataArgsStorage } from 'typeorm';

const entitiesPath = process.env.ORM_ENTITIES
  ? `${process.env.ORM_ENTITIES}`
  : 'dist/**/*.entity.js';
const migrationPath = process.env.ORM_MIGRATIONS
  ? `${process.env.ORM_MIGRATIONS}`
  : 'dist/**/migrations/*.js';

export default registerAs('typeorm', () => ({
  type: process.env.ORM_CONNECTION || 'postgres',
  host: process.env.ORM_HOST || '127.0.0.1',
  username: process.env.ORM_USERNAME,
  password: process.env.ORM_PASSWORD,
  database: process.env.ORM_DATABASE,
  logging: process.env.ORM_LOGGING === 'true',
  sincronize: process.env.ORM_SYNCHRONIZE === 'true',
  port: Number.parseInt(process.env.ORM_PORT, 10),
  entities: getMetadataArgsStorage().tables.map((t) => t.target) || [
    entitiesPath,
  ],
  migrations: [migrationPath],
  migrationsRun: process.env.ORM_MIGRATIONS_RUN === 'true',
  seeds: ['src/**/migrations/seeds/*.seed.ts'],
  cli: {
    migrationsDir: 'src/**/migrations',
    entitiesDir: 'src/**/*.entity.ts',
  },
}));
