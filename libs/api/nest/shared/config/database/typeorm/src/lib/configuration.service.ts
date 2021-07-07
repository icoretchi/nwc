import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const type: any = this.configService.get<string>('typeorm.type');
    return {
      type,
      host: this.configService.get<string>('typeorm.host'),
      username: this.configService.get<string>('typeorm.username'),
      password: this.configService.get<string>('typeorm.password'),
      database: this.configService.get<string>('typeorm.database'),
      port: this.configService.get<number>('typeorm.port'),
      logging: this.configService.get<boolean>('typeorm.logging'),
      entities: this.configService.get<string[]>('typeorm.entities'),
      migrations: this.configService.get<string[]>('typeorm.migrations'),
      migrationsRun: this.configService.get<boolean>('typeorm.migrationsRun'),
      synchronize: this.configService.get<boolean>('typeorm.sincronize'),
      cli: this.configService.get<any>('typeorm.cli'),
      url: this.configService.get<any>('typeorm.url'),
      // autoLoadEntities: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      w: 'majority',
      wtimeout: 2500,
    };
  }
}
