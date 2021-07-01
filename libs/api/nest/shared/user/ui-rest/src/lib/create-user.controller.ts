import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BaseController, TextUtils } from '@nwc/api/nest/shared/common';
import {
  CreateUserCommand,
  CreateUserErrors,
  CreateUserService,
} from '@nwc/api/nest/shared/user/core/application-services';
import { Response } from 'express';

import { CreateUserRequest } from './create-user.request.dto';
import { DecodedExpressRequest } from './decoded-express.request';

@Controller()
export class CreateUserController extends BaseController {
  constructor(private readonly createUserService: CreateUserService) {
    super();
  }

  @Post('users')
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async executeImpl(
    @Req() req: DecodedExpressRequest,
    @Res() res: Response
  ): Promise<any> {
    const dto: CreateUserRequest = req.body as CreateUserRequest;

    const command: CreateUserCommand = {
      username: TextUtils.sanitize(dto.username),
      email: TextUtils.sanitize(dto.email),
      password: dto.password,
    };

    try {
      const result = await this.createUserService.execute(command);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateUserErrors.UsernameTakenError:
            return this.conflict(error.errorValue().message);
          case CreateUserErrors.EmailAlreadyExistsError:
            return this.conflict(error.errorValue().message);
          default:
            return this.fail(res, error.errorValue().message);
        }
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
