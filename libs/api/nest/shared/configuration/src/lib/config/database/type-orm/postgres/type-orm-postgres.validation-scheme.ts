import * as Joi from 'joi';

export const typeOrmPostgresValidationSchema = {
  POSTGRES_HOST: Joi.string().default('localhost'),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_USER: Joi.string().default('postgres'),
  POSTGRES_PASSWORD: Joi.string().default('postgres'),
  POSTGRES_DATABASE: Joi.string().default('postgres'),
  POSTGRES_DROP_DB: Joi.boolean().default(false),
};
