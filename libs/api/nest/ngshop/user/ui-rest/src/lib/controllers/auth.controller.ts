import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { EmailAlreadyExistsError } from '@nwc/api/nest/ngshop/user/core/application';
import {
  UserEmail,
  UserName,
  UserPassword,
} from '@nwc/api/nest/ngshop/user/core/domain';
import { SignUpUserCommand } from '@nwc/api/nest/ngshop/user/core/ports';
import { BaseController, TextUtils } from '@nwc/api/nest/shared/common';
import { plainToClass } from 'class-transformer';
import { Response } from 'express';

import { AuthResponseDto, SignUpRequestDto } from '../dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController extends BaseController {
  constructor(private commandBus: CommandBus) {
    super();
  }

  @Post('/sign-up')
  @ApiBadRequestResponse({ description: 'Invalid request body.' })
  @ApiUnprocessableEntityResponse({
    description: 'Email or username taken.',
  })
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() req: SignUpRequestDto, @Res() res: Response) {
    const dto = {
      username: TextUtils.sanitize(req.name),
      email: TextUtils.sanitize(req.email),
      password: req.password,
    };

    try {
      const result = await this.commandBus.execute(
        new SignUpUserCommand(
          UserName.fromString(dto.username),
          UserEmail.fromString(dto.email),
          UserPassword.fromString(dto.password)
        )
      );

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case EmailAlreadyExistsError:
            return this.conflict(error.errorValue().message);
          default:
            return this.fail(res, error.errorValue().message);
        }
      } else {
        return this.ok(
          res,
          plainToClass(AuthResponseDto, result.value.getValue())
        );
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
