import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SequelizeOrmPostgresConfigService {
  constructor(private configService: ConfigService) {}

  get username(): string {
    return this.configService.get<string>('username');
  }
  get password(): string {
    return this.configService.get<string>('password');
  }
  get database(): string {
    return this.configService.get<string>('database');
  }
  get host(): string {
    return this.configService.get<string>('host');
  }
  get port(): number {
    return Number(this.configService.get<number>('port'));
  }
  get dialect(): string {
    return this.configService.get<string>('dialect');
  }
  get logging(): boolean {
    return this.configService.get<boolean>('logging');
  }
  get force(): boolean {
    return this.configService.get<boolean>('force');
  }
  get timezone(): string {
    return this.configService.get<string>('timezone');
  }
}
