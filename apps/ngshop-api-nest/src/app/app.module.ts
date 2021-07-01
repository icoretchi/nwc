import { Module } from '@nestjs/common';
import {
  AppConfigService,
  ConfigurationModule,
} from '@nwc/api/nest/shared/configuration';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigurationModule],
  controllers: [AppController],
  providers: [AppService, AppConfigService],
})
export class AppModule {}
