import { BaseController } from '@nwc/api/node/shared/infra';
import { TextUtils } from '@nwc/api/node/shared/utils';
import * as express from 'express';

import { CreateUserDTO } from '../../../application/port/in/CreateUserDTO';
import { CreateUserErrors } from '../../../application/useCases/createUser/CreateUserErrors';
import { CreateUserService } from '../../../application/useCases/createUser/CreateUserService';
import { DecodedExpressRequest } from './decodedRequest';

export class CreateUserController extends BaseController {
  private useCase: CreateUserService;

  constructor(useCase: CreateUserService) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    let dto: CreateUserDTO = req.body as CreateUserDTO;

    dto = {
      username: TextUtils.sanitize(dto.username),
      email: TextUtils.sanitize(dto.email),
      password: dto.password,
    };

    try {
      const result = await this.useCase.execute(dto);

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
