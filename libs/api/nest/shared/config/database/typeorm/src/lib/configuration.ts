import { ConfigType, registerAs } from '@nestjs/config';
import { getMetadataArgsStorage } from 'typeorm';

const entitiesPath = process.env.DATABASE_ENTITIES
  ? `${process.env.DATABASE_ENTITIES}`
  : 'dist/**/*.entity.js';
const migrationPath = process.env.DATABASE_MIGRATIONS
  ? `${process.env.DATABASE_MIGRATIONS}`
  : 'dist/**/migrations/*.js';

export const typeOrmConfig = registerAs('typeorm', () => ({
  type: process.env.DATABASE_TYPE || 'postgres',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  logging: process.env.DATABASE_LOGGING === 'true',
  sincronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  port: Number.parseInt(process.env.DATABASE_PORT, 10),
  entities: getMetadataArgsStorage().tables.map((t) => t.target) || [
    entitiesPath,
  ],
  migrations: [migrationPath],
  migrationsRun: process.env.DATABASE_MIGRATIONS_RUN === 'false',
  seeds: ['src/**/migrations/seeds/*.seed.ts'],
  url: process.env.DATABASE_URL,
  cli: {
    migrationsDir: 'src/**/migrations',
    entitiesDir: 'src/**/*.entity.ts',
  },
  connectTimeout: parseInt(process.env.DATABASE_CONNECTION_TIME_OUT),
  acquireTimeout: parseInt(process.env.DATABASE_ACQUIRE_TIME_OUT),
  extra: {
    connectionLimit: parseInt(process.env.DATABASE_CONNECTION_LIMIT),
  },
  WriteConcern: { w: 'majority', wtimeout: 2500 },
}));

export type TypeOrmConfig = ConfigType<typeof typeOrmConfig>;
