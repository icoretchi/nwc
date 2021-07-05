import { registerAs } from '@nestjs/config';

export default registerAs('es', () => ({
  host: process.env.ELASTIC_SEARCH_HOST || '127.0.0.1',
  port: process.env.ELASTIC_SEARCH_PORT || '9200',
}));
