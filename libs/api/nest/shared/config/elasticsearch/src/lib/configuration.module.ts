import { Module } from '@nestjs/common';
import configuration from './configuration';
import { ElasticsearchConfigService } from './configuration.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
  ],
  providers: [ConfigService, ElasticsearchConfigService],
  exports: [ConfigService, ElasticsearchConfigService],
})
export class ElasticsearchConfigModule { }