export const PASSWORD_MIN_LENGTH = 3;
export const PASSWORD_MAX_LENGTH = 20;

import { Result, ValueObject } from '@nwc/api/nest/shared/common';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

import { ErrorMessages } from '../../error-messages/messages';
import { PasswordInterface } from './interfaces/password.interface';

const isEncryptPass = /\$2b\$\d\d\$[\s\S]{53}|{.}\b/gm;

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
  /**
   *
   * @param plainText password not encrypted as string
   * @returns `true` if match and `false` else not
   */
  async comparePasswords(plainText: string): Promise<boolean> {
    if (this.isEncrypted) {
      return compareSync(plainText, this.props.value);
    }
    return plainText === this.props.value;
  }

  public static create(password: string): Result<UserPassword> {
    const isEncrypt = isEncryptPass.test(password);

    if (!isEncrypt) {
      const isValidPasswordLength =
        password.length >= PASSWORD_MIN_LENGTH &&
        password.length <= PASSWORD_MAX_LENGTH;

      if (!isValidPasswordLength) {
        return Result.fail<UserPassword>(ErrorMessages.INVALID_PASSWORD_LENGTH);
      }
    }

    return Result.ok<UserPassword>(
      new UserPassword({ value: password }, isEncrypt)
    );
  }
}
