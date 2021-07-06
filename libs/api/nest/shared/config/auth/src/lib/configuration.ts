import { ConfigType, registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('oauth2', () => ({
  clientId: process.env.OAUTH2_CLIENTID,
  clientSecret: process.env.OAUTH2_CLIENT_SECRET,
  jwtSecret: process.env.OAUTH2_JWT_SECRET,
  callbackURL: process.env.APP_URL + '/auth/google/callback',
  expiresIn: process.env.OAUTH2_JWT_EXPIRES_IN ?? 60 * 60 * 1000,
}));

export type JwtConfig = ConfigType<typeof jwtConfig>;
