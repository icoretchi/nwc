import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { FindUserByEmailResponse } from '@nwc/api/nest/ngshop/user/core/application';
import {
  UserAggregate,
  UserEmail,
} from '@nwc/api/nest/ngshop/user/core/domain';
import { FindUserByEmailQuery } from '@nwc/api/nest/ngshop/user/core/ports';
import * as bcrypt from 'bcryptjs';

import { JwtPayloadDto } from '../dto';
import { AccessTokenDto } from '../dto/access-token.dto';

@Injectable()
export class AuthService {
  constructor(private queryBus: QueryBus, private jwtService: JwtService) {}

  async encodePassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hashSync(password, salt);
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const userOrError = await this.queryBus.execute<
      FindUserByEmailQuery,
      FindUserByEmailResponse
    >(new FindUserByEmailQuery(UserEmail.fromString(email)));

    if (userOrError.isRight()) {
      const user: UserAggregate = userOrError.value.getValue();
      return user && (await bcrypt.compareSync(password, user.password));
    }

    return false;
  }

  async generateAccessToken(email: string): Promise<AccessTokenDto> {
    const userOrError = await this.queryBus.execute<
      FindUserByEmailQuery,
      FindUserByEmailResponse
    >(new FindUserByEmailQuery(UserEmail.fromString(email)));

    if (userOrError.isRight()) {
      const user: UserAggregate = userOrError.value.getValue();

      const payload: JwtPayloadDto = {
        id: user.userId.id.toString(),
        email,
      };

      return {
        access_token: this.jwtService.sign(payload, {
          algorithm: 'HS512',
        }),
      };
    }
  }
}
