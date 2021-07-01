export default () => ({
  username: process.env.MONGO_USER || '',
  password: process.env.MONGO_PASSWORD || 'postgres',
  database: process.env.MONGO_DATABASE || 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.MONGO_PORT) || 27017,
  url: process.env.MONGO_URL,
});
