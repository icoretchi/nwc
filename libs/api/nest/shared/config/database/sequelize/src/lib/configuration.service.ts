import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    const dialect: any = this.configService.get<string>('sequelize.type');
    return {
      dialect,
      host: this.configService.get<string>('sequelize.host'),
      username: this.configService.get<string>('sequelize.username'),
      password: this.configService.get<string>('sequelize.password'),
      database: this.configService.get<string>('sequelize.database'),
      port: this.configService.get<number>('sequelize.port'),
      logging: this.configService.get<boolean>('sequelize.logging'),
    };
  }
}
