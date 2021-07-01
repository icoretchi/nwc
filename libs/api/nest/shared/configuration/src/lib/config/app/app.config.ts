export default () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  name: process.env.APP_NAME,
  url: process.env.APP_URL,
});
