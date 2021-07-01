import { JWTClaims } from '@nwc/api/nest/shared/user/core/domain';
import * as express from 'express';

export interface DecodedExpressRequest extends express.Request {
  decoded: JWTClaims;
}
