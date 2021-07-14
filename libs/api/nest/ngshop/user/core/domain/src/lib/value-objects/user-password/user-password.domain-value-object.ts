export const PASSWORD_MIN_LENGTH = 3;
export const PASSWORD_MAX_LENGTH = 20;

import { Guard, Result, ValueObject } from '@nwc/api/nest/shared/common';
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

    if (!isEncrypt) {
      const isValidPasswordLength =
        props.value.length >= PASSWORD_MIN_LENGTH &&
        props.value.length <= PASSWORD_MAX_LENGTH;

      if (!isValidPasswordLength) {
        return Result.fail<UserPassword>(ErrorMessages.INVALID_PASSWORD_LENGTH);
      }
    }

    return Result.ok<UserPassword>(
      new UserPassword({ value: props.value }, isEncrypt)
    );
  }

  public static fromString(password: string): UserPassword {
    const passwordResult = Guard.againstNullOrUndefined(password, 'password');
    if (!passwordResult.succeeded) {
      throw new Error(passwordResult.message);
    }
    const isEncrypt = isEncryptPass.test(password);
    if (!isEncrypt) {
      const isValidPasswordLength =
        password.length >= PASSWORD_MIN_LENGTH &&
        password.length <= PASSWORD_MAX_LENGTH;

      if (!isValidPasswordLength) {
        throw new Error(ErrorMessages.INVALID_PASSWORD_LENGTH);
      }
    }

    return new UserPassword({ value: password }, isEncrypt);
  }
}
