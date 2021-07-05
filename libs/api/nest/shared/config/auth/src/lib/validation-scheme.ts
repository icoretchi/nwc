import * as Joi from 'joi';

export const validationSchema = Joi.object({
  OAUTH2_CLIENTID: Joi.string(),
  OAUTH2_CLIENT_SECRET: Joi.string(),
  OAUTH2_JWT_SECRET: Joi.string(),
});
