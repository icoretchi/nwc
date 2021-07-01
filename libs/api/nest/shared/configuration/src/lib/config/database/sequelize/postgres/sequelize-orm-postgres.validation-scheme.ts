import * as Joi from 'joi';

export const sequelizeOrmPostgresValidationSchema = {
  POSTGRES_HOST: Joi.string().default('localhost'),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_USER: Joi.string().default('nest'),
  POSTGRES_PASSWORD: Joi.string().default('nest'),
  POSTGRES_DATABASE: Joi.string().default('nest'),
  POSTGRES_DROP_DB: Joi.boolean().default(false),
};
