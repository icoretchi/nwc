import { Module } from '@nestjs/common';
import { UserShellModule } from '@nwc/api/nest/ngshop/user/shell';

import { AuthController, UserController } from './controllers';

@Module({
  imports: [UserShellModule],
  controllers: [AuthController, UserController],
  providers: [],
  exports: [],
})
export class UserUiRestModule {}
