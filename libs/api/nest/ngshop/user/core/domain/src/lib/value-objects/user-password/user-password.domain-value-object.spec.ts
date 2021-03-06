import { genSaltSync, hashSync } from 'bcryptjs';

import { UserPassword } from './user-password.domain-value-object';

describe('password.value-object', () => {
  it('should create a valid password', () => {
    const password = UserPassword.create('123abc');

    expect(password.isSuccess).toBe(true);
    expect(password.getResult().value).toBe('123abc');
    expect(password.getResult().isAlreadyEncrypted).toBe(false);
  });

  it('should fail if password is not on range min 3 char and max 20 char', async () => {
    const shortPassword = await UserPassword.create('i');
    expect(shortPassword.isFailure).toBe(true);
    expect(shortPassword.error).toBe(
      'Password must have min 3 char and max 20 char'
    );
    const longPassword = UserPassword.create(
      'invalid_long_password_to_validate_password_must_have_max_20_char'
    );
    expect(longPassword.isFailure).toBe(true);
    expect(longPassword.error).toBe(
      'Password must have min 3 char and max 20 char'
    );
  });

  it('should create a valid encrypted password', async () => {
    const salt = genSaltSync();
    //  deepcode ignore HardcodedNonCryptoSecret: <it is only test>
    const encryptedPass = hashSync('123abc', salt);
    const password = UserPassword.create(encryptedPass);

    expect(password.isSuccess).toBe(true);
    expect(password.getResult().value).toBe(encryptedPass);
  });

  it('should create a valid password and encrypted after create', async () => {
    const password = UserPassword.create('123abc');
    expect(password.getResult().isAlreadyEncrypted).toBe(false);
    await password.getResult().encryptPassword();
    expect(password.getResult().isAlreadyEncrypted).toBe(true);
  });

  it('should compare an encripted password and return true if matches', async () => {
    const password = UserPassword.create('123abc');
    expect(password.getResult().isAlreadyEncrypted).toBe(false);

    const isEqualPlainText = await password
      .getResult()
      .comparePasswords('123abc');
    expect(isEqualPlainText).toBe(true);

    await password.getResult().encryptPassword();
    expect(password.getResult().isAlreadyEncrypted).toBe(true);
    const isEqualEncrypted = await password
      .getResult()
      .comparePasswords('123abc');
    expect(isEqualEncrypted).toBe(true);
  });

  it('should compare an encripted password and return false if does not match', async () => {
    const password = UserPassword.create('123abc');
    expect(password.getResult().isAlreadyEncrypted).toBe(false);

    const isEqualPlainText = await password
      .getResult()
      .comparePasswords('invalid_password');
    expect(isEqualPlainText).toBe(false);

    await password.getResult().encryptPassword();
    expect(password.getResult().isAlreadyEncrypted).toBe(true);
    const isEqualEncrypted = await password
      .getResult()
      .comparePasswords('invalid_password');
    expect(isEqualEncrypted).toBe(false);
  });
});
