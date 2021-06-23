import { Module } from '@nestjs/common';
import { CoreModule } from '@nwc/api/nest/shared/core';

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class UsersModule {}
