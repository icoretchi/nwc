import { Inject, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { FindUserByEmailResponse } from '@nwc/api/nest/ngshop/user/core/application';
import { UserEmail } from '@nwc/api/nest/ngshop/user/core/domain';
import { FindUserByEmailQuery } from '@nwc/api/nest/ngshop/user/core/ports';
import {
  AnonymousUser,
  AppUser,
  AuthenticatedUser,
} from '@nwc/api/nest/shared/common';
import { JwtConfig, jwtConfig } from '@nwc/api/nest/shared/config/auth';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayloadDto } from '../dto/jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConf: JwtConfig,
    private queryBus: QueryBus
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

    try {
      const result = await this.queryBus.execute<
        FindUserByEmailQuery,
        FindUserByEmailResponse
      >(new FindUserByEmailQuery(UserEmail.fromString(payload.email)));

      if (result.isLeft()) {
        return new AnonymousUser();
      } else {
        return new AuthenticatedUser(payload.email, payload.id);
      }
    } catch (err) {
      return new AnonymousUser();
    }
  }
}
