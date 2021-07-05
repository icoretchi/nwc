import { ConnectionOptions } from 'typeorm';

export const connection = (entities): ConnectionOptions => {
  return {
    type: 'sqlite',
    entities,
    database: process.env.SQLITE_DATABASE || `tmp/development.sqlite`,
    synchronize: true,
    logging: true,
  };
};
