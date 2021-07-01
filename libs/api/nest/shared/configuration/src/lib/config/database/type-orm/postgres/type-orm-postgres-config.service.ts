import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmPostgresConfigService {
  constructor(private configService: ConfigService) {}

  get type(): string {
    return this.configService.get<string>('type');
  }
  get host(): string {
    return this.configService.get<string>('host');
  }
  get port(): number {
    return Number(this.configService.get<number>('port'));
  }
  get username(): string {
    return this.configService.get<string>('username');
  }
  get database(): string {
    return this.configService.get<string>('database');
  }
  get autoLoadEntities(): boolean {
    return this.configService.get<boolean>('autoLoadEntities');
  }
  get logging(): string[] {
    return this.configService.get<string[]>('logging');
  }
  get synchronize(): boolean {
    return this.configService.get<boolean>('synchronize');
  }
  get dropSchema(): boolean {
    return this.configService.get<boolean>('dropSchema');
  }
}
