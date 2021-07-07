import * as Joi from 'joi';

export const validationSchema = Joi.object({
  DATABASE_TYPE: Joi.string().default('postgres'),
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_USERNAME: Joi.string().default('postgres'),
  DATABASE_PASSWORD: Joi.string().default('postgres'),
  DATABASE_DATABASE: Joi.string().default('postgres'),
  DATABASE_DROP_DB: Joi.boolean().default(false),
  DATABASE_LOGGING: Joi.boolean().default(true),
  DATABASE_SYNCHRONIZE: Joi.boolean().default(true),
  DATABASE_MIGRATIONS_RUN: Joi.boolean().default(true),
});
