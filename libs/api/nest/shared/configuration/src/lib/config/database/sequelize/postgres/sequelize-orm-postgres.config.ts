export default () => ({
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DATABASE || 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  dialect: 'postgres',
  logging: false,
  force: true,
  timezone: '+02:00',
});
