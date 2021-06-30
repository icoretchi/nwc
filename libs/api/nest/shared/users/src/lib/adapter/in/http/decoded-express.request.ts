import * as express from 'express';

import { JWTClaims } from '../../../domain/types/jwt.type';

export interface DecodedExpressRequest extends express.Request {
  decoded: JWTClaims;
}
