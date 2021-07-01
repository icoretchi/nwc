export default () => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || '127.0.0.1',
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DATABASE || 'postgres',
  entities: [],
  autoLoadEntities: true,
  logging: ['error', 'migration', 'schema'],
  synchronize: true,
  dropSchema: !!process.env.POSTGRES_DROP_DB,
});
