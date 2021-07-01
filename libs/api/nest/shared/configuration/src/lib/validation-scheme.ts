import * as Joi from 'joi';

import { appValidationSchema } from './config/app/app.validation-scheme';
import { mongooseValidationSchema } from './config/database/mongoose/mongoose.validation-scheme';
import { sequelizeOrmPostgresValidationSchema } from './config/database/sequelize/postgres/sequelize-orm-postgres.validation-scheme';
import { typeOrmPostgresValidationSchema } from './config/database/type-orm/postgres/type-orm-postgres.validation-scheme';

export const validationSchema = Joi.object({
  ...appValidationSchema,
  ...mongooseValidationSchema,
  ...sequelizeOrmPostgresValidationSchema,
  ...typeOrmPostgresValidationSchema,
});
