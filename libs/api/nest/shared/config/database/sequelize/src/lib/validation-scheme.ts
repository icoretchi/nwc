import * as Joi from 'joi';

export const validationSchema = Joi.object({
  TYPEORM_CONNECTION: Joi.string().default('postgres'),
  TYPEORM_HOST: Joi.string().default('localhost'),
  // TYPEORM_PORT: Joi.number().default(5432),
  TYPEORM_USERNAME: Joi.string().default('postgres'),
  TYPEORM_PASSWORD: Joi.string().default('postgres'),
  TYPEORM_DATABASE: Joi.string().default('postgres'),
  TYPEORM_DROP_DB: Joi.boolean().default(false),
  TYPEORM_LOGGING: Joi.boolean().default(true),
  TYPEORM_SYNCHRONIZE: Joi.boolean().default(true),
  TYPEORM_MIGRATIONS_RUN: Joi.boolean().default(true),
});
