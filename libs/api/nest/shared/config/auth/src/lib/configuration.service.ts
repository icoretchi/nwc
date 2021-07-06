import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class OAuth2ConfigService {
  constructor(private configService: ConfigService) {}

  get clientId(): string {
    return this.configService.get<string>('oauth2.clientId');
  }
  get clientSecret(): string {
    return this.configService.get<string>('oauth2.clientSecret');
  }
  get jwtSecret(): string {
    return this.configService.get<string>('oauth2.jwtSecret');
  }
  get callbackURL(): string {
    return this.configService.get<string>('oauth2.callbackURL');
  }
}

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get<string>('oauth2.jwtSecret'),
      signOptions: {
        expiresIn: this.configService.get<string>('oauth2.expiresIn'),
      },
    };
  }
}


