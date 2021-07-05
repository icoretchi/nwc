import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  APP_PORT: Joi.number().default(3000),
  APP_NAME: Joi.string(),
  APP_URL: Joi.string(),
});
