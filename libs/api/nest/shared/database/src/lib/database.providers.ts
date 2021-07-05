import { createConnection } from 'typeorm';

import { connection } from './database.config';
import { DB_CON_TOKEN } from './database.constants';

export const createDatabaseProviders = (entities) => {
  return [
    {
      provide: DB_CON_TOKEN,
      useFactory: async () => createConnection(connection(entities)),
    },
  ];
};
