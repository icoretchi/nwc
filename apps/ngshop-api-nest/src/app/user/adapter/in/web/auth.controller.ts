import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

import { LoginUserCommand } from '../../../application/port/in/command/login-user.command';
import {
  LOGIN_USER_USE_CASE,
  LoginUserErrors,
  LoginUserUseCase,
} from '../../../application/port/in/command/login-user.use-case';
import { SignUpUserCommand } from '../../../application/port/in/command/sign-up-user.command';
import {
  SIGN_UP_USER_USE_CASE,
  SignUpUserErrors,
  SignUpUserUseCase,
} from '../../../application/port/in/command/sign-up-user.use-case';
import { LoginRequestDto } from './dto/request/login-request.dto';
import { SignUpRequestDto } from './dto/request/sign-up-request.dto';
import { AuthResponseDto } from './dto/response/auth-response.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject(SIGN_UP_USER_USE_CASE)
    private readonly signUpUseCase: SignUpUserUseCase,
    @Inject(LOGIN_USER_USE_CASE)
    private readonly loginUseCase: LoginUserUseCase
  ) {}

  @Post('/login')
  @ApiForbiddenResponse({ description: 'Invalid credentials.' })
  @ApiBadRequestResponse({ description: 'Invalid request body.' })
  @HttpCode(HttpStatus.OK)
  async login(@Body() request: LoginRequestDto): Promise<AuthResponseDto> {
    return pipe(
      await this.loginUseCase.login(
        new LoginUserCommand(request.email, request.password)
      ),
      E.fold(
        (error) => {
          switch (error) {
            case LoginUserErrors.InvalidCredentials:
              throw new ForbiddenException('Invalid credentials');
          }
        },
        (resp) => plainToClass(AuthResponseDto, resp)
      )
    );
  }

  @Post('/sign-up')
  @ApiBadRequestResponse({ description: 'Invalid request body.' })
  @ApiUnprocessableEntityResponse({
    description: 'Email or password taken.',
  })
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() request: SignUpRequestDto): Promise<AuthResponseDto> {
    return pipe(
      await this.signUpUseCase.signUp(
        new SignUpUserCommand(request.name, request.email, request.password)
      ),
      E.fold(
        (error) => {
          switch (error) {
            case SignUpUserErrors.EmailTaken:
              throw new UnprocessableEntityException(
                'Email or password is already taken'
              );
          }
        },
        (resp) => plainToClass(AuthResponseDto, resp)
      )
    );
  }
}
