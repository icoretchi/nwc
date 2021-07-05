import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      host: this.configService.get<string>('mongoose.host'),
      port: this.configService.get<string>('mongoose.port'),
      user: this.configService.get<string>('mongoose.username'),
      pass: this.configService.get<string>('mongoose.password'),
      dbname: this.configService.get<string>('mongoose.database'),
      uri: this.configService.get<string>('mongoose.uri'),
    };
  }
}
