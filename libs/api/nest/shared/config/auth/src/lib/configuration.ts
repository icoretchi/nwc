import { registerAs } from '@nestjs/config';

export default registerAs('oauth2', () => ({
  clientId: process.env.OAUTH2_CLIENTID,
  clientSecret: process.env.OAUTH2_CLIENT_SECRET,
  jwtSecret: process.env.OAUTH2_JWT_SECRET,
  callbackURL: process.env.APP_URL + '/auth/google/callback',
}));
