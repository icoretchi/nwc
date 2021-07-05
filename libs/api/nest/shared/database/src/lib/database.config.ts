import { connections } from './typeorm/configs';

const type = process.env.DB_TYPE || 'sqlite';

export const connection = (entities) => {
  return connections[type](entities);
};
