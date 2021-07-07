import * as Joi from 'joi';

export const validationSchema = Joi.object({
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_PORT: Joi.number().default(27017),
  DATABASE_USER: Joi.string().default('nest'),
  DATABASE_PASSWORD: Joi.string().default('nest'),
  DATABASE_DATABASE: Joi.string().default('nest'),
  // DATABASE_URL: Joi.string().default('mongodb://mongo:27017/nest'),
});
