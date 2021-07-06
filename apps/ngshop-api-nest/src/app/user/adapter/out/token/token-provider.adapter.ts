import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenProviderPort } from '../../../application/port/out/query/token-provider.port';

@Injectable()
export class TokenProviderAdapter implements TokenProviderPort {
  constructor(private readonly jwtService: JwtService) {}

  signToken(id: number, email: string): string {
    return this.jwtService.sign({ id, email });
  }
}
