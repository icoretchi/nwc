import { Module } from '@nestjs/common';
import {
  AppConfigModule,
  AppConfigService,
} from '@nwc/api/nest/shared/config/app';
import { DatabaseModule } from '@nwc/api/nest/shared/database';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AppConfigModule, DatabaseModule.forRoot([])],
  controllers: [AppController],
  providers: [AppService, AppConfigService],
})
export class AppModule {}
