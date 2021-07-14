import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserAggregate } from '@nwc/api/nest/ngshop/user/core/domain';
import { AuthRequired, CurrentUser } from '@nwc/api/nest/shared/common';

import { UserResponseDto } from '../dto';

@Controller()
@ApiTags('user')
export class UserController {
  @Get('/me')
  @AuthRequired()
  me(@CurrentUser() user: UserAggregate): UserResponseDto {
    return new UserResponseDto(user);
  }
}
