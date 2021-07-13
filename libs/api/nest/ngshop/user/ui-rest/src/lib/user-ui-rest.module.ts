import { Module } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserShellModule } from '@nwc/api/nest/ngshop/user/shell';

import { AuthController, UserController } from './controllers';

@Module({
  imports: [UserShellModule],
  controllers: [AuthController, UserController],
  providers: [
    {
      provide: 'CommandBus',
      useClass: CommandBus,
    },
    {
      provide: 'QueryBus',
      useClass: QueryBus,
    },
  ],
  exports: [],
})
export class UserUiRestModule {}
