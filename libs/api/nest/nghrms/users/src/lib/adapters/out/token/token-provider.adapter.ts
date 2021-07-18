import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenProviderPort } from '../../../application';

@Injectable()
export class TokenProviderAdapter implements TokenProviderPort {
  constructor(private readonly jwtService: JwtService) {}

  signToken(id: string, email: string): string {
    return this.jwtService.sign({ id, email });
  }
}
