import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BaseController, Result, TextUtils } from '@nwc/api/nest/shared/core';
import { Response } from 'express';

import { CreateUserCommand } from '../../../application/port/in/create-user.command';
import { CreateUserErrors } from '../../../application/service/create-user/create-user-errors';
import { CreateUserService } from '../../../application/service/create-user/create-user.service';
import { CreateUserRequest } from './create-user.request.dto';
import { DecodedExpressRequest } from './decoded-express.request';

@Controller()
export class CreateUserController extends BaseController {
  constructor(private readonly createUserService: CreateUserService) {
    super();
  }

  @Post(routes.user.root)
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
    let dto: CreateUserRequest = req.body as CreateUserRequest;

    dto = {
      username: TextUtils.sanitize(dto.username),
      email: TextUtils.sanitize(dto.email),
      password: dto.password,
    };

    const createUserCommandOrError = CreateUserCommand.create(dto);
    if (createUserCommandOrError.isFailure) {
      return this.fail(res, createUserCommandOrError.error.toString());
    }

    try {
      const command = createUserCommandOrError.getValue();
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
