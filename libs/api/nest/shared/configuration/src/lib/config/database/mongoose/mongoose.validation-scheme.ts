import * as Joi from 'joi';

export const mongooseValidationSchema = {
  MONGO_HOST: Joi.string().default('localhost'),
  MONGO_PORT: Joi.number().default(5432),
  MONGO_USER: Joi.string().default('nest'),
  MONGO_PASSWORD: Joi.string().default('nest'),
  MONGO_DATABASE: Joi.string().default('nest'),
  MONGO_URL: Joi.string().default('mongodb://mongo:27017/nest'),
};
