import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  AnonymousUser,
  AppUser,
  AuthenticatedUser,
} from '@nwc/api/nest/shared/common';
import { JwtConfig, jwtConfig } from '@nwc/api/nest/shared/config/auth';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import { ExtractJwt, Strategy } from 'passport-jwt';

import {
  FIND_USER_BY_EMAIL_USE_CASE,
  FindUserByEmailUseCase,
} from '../../../../application/port/in/query/find-user-by-email-use.case';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConf: JwtConfig,
    @Inject(FIND_USER_BY_EMAIL_USE_CASE)
    private readonly findUser: FindUserByEmailUseCase
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConf.jwtSecret,
    });
  }

  async validate(payload: JwtPayloadDto): Promise<AppUser> {
    if (!payload.email) {
      return new AnonymousUser();
    }
    return pipe(
      await this.findUser.findByEmail(payload.email),
      O.fold(
        () => new AnonymousUser(),
        (u) => new AuthenticatedUser(u.email, u.id)
      )
    );
  }
}
