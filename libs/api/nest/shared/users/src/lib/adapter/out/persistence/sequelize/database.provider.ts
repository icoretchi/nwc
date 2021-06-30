import { Sequelize } from 'sequelize-typescript';

import { databaseConfig } from './database.config';
import { UserModel } from './user.model';

export const databaseProvider = {
  provide: 'SequelizeInstance',
  useFactory: async () => {
    let config;
    switch (process.env.NODE_ENV) {
      case 'prod':
      case 'production':
      case 'dev':
      case 'development':
      default:
        config = databaseConfig.development;
    }

    const sequelize = new Sequelize(config);
    sequelize.addModels([UserModel]);
    /* await sequelize.sync(); */
    return sequelize;
  },
};
