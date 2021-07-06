import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthRequired, CurrentUser } from '@nwc/api/nest/shared/common';
import { plainToClass } from 'class-transformer';

import { User } from '../../../domain/model/user.domain-model';
import { UserResponseDto } from './dto/response/user-response.dto';

@Controller()
@ApiTags('user')
export class UserController {
  @Get('/me')
  @AuthRequired()
  me(@CurrentUser() user: User): UserResponseDto {
    return plainToClass(UserResponseDto, user);
  }
}
