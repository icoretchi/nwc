export const PASSWORD_MIN_LENGTH = 3;
export const PASSWORD_MAX_LENGTH = 20;

import {
  ArgumentOutOfRangeException,
  Guard,
  Result,
  ValueObject,
} from '@nwc/api/nest/nghrms/shared/common';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

import { ErrorMessages } from '../../error-messages/messages';
import { PasswordInterface } from './interfaces/password.interface';

const isEncryptPass = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
);
export interface UserPasswordProps {
  value: string;
}
export class UserPassword
  extends ValueObject<UserPasswordProps>
  implements PasswordInterface {
  private isEncrypted: boolean;

  private constructor(props: UserPasswordProps, isEncrypted: boolean) {
    super(props);
    this.isEncrypted = isEncrypted;
  }

  get value(): string {
    return this.props.value;
  }

  get isAlreadyEncrypted(): boolean {
    return this.isEncrypted;
  }

  async encryptPassword(): Promise<void> {
    const salt = genSaltSync();
    this.props.value = hashSync(this.props.value, salt);
    this.isEncrypted = true;
  }

  async comparePasswords(plainText: string): Promise<boolean> {
    if (this.isEncrypted) {
      return compareSync(plainText, this.props.value);
    }
    return plainText === this.props.value;
  }

  public static create(props: UserPasswordProps): Result<UserPassword> {
    const isEncrypt = isEncryptPass.test(props.value);

    return Result.ok<UserPassword>(
      new UserPassword({ value: props.value }, isEncrypt)
    );
  }

  public static fromString(password: string): UserPassword {
    const isEncrypt = isEncryptPass.test(password);

    return new UserPassword({ value: password }, isEncrypt);
  }

  protected validate(props: UserPasswordProps): void {
    const isEncrypt = isEncryptPass.test(props.value);
    if (!isEncrypt) {
      if (
        !Guard.lengthIsBetween(
          props.value,
          PASSWORD_MIN_LENGTH,
          PASSWORD_MAX_LENGTH
        )
      ) {
        throw new ArgumentOutOfRangeException(
          `${ErrorMessages.INVALID_PASSWORD_LENGTH}`
        );
      }
    }
  }
}
