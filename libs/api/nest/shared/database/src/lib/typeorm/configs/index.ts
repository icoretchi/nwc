import { ConnectionOptions } from 'typeorm';

import { connection as postgres } from './postgres.config';
import { connection as sqlite } from './sqlite.config';

export const connections: { [key: string]: (entities) => ConnectionOptions } = {
  sqlite,
  postgres,
};
